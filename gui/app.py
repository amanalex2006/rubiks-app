"""A native, themed workspace for scanning, painting, and solving a cube."""

import json
import gc
import os
from pathlib import Path
import time
import threading
import tkinter as tk
from tkinter import filedialog

import cv2 as cv
import numpy as np

from bridge.report_job import ReportJob
from bridge.report_session import ReportSession
from gui.model import COLORS, COLOR_NAMES, ManualCube, SAMPLE, SCAN, STICKERS, net_cells, scan_position
from gui.theme import PALETTES
from gui.frame_rate import FrameRate
from scanner import main as detector
from scanner.cube_state import write_cube_report
from scanner.color_model import ColorModel
from scanner.frame_worker import LatestFrameWorker
from scanner.camera_capture import CameraCapture
from scanner.vision_snapshot import capture_requested_snapshot
from viewer.server import ViewerServer
from viewer.embedded import EmbeddedViewer


APP_ROOT = Path(__file__).resolve().parents[1]
SETTINGS = APP_ROOT / ".ui_settings.json"


class SolverCard:
    def __init__(self, app, parent, name, description, column):
        self.app = app
        self.solver_key = "kociemba" if column == 0 else "java"
        self.notation = None
        self.card = app.box(parent)
        self.card.grid(row=0, column=column, sticky="nsew", padx=(0, 8) if column == 0 else (8, 0))
        self.card.columnconfigure(0, weight=1)
        title_row = app.frame(self.card)
        title_row.grid(row=0, column=0, sticky="ew", padx=18, pady=(10, 2))
        app.label(title_row, name, font=("Segoe UI", 13, "bold")).pack(side="left")
        self.badge = app.label(title_row, "READY", fg="on_badge", bg="badge", font=("Segoe UI", 8, "bold"), padx=9, pady=4)
        self.badge.pack(side="right")
        self.detail = app.label(self.card, description, fg="muted", anchor="w")
        self.detail.grid(row=1, column=0, sticky="ew", padx=18)
        self.text = tk.Text(self.card, width=1, height=2, relief="flat", borderwidth=0, wrap="word",
                            font=("Consolas", 12), padx=0, pady=6, cursor="arrow", takefocus=True)
        app.colors(self.text, bg="card", fg="muted", insertbackground="text", selectbackground="accent", selectforeground="accent_text")
        self.text.grid(row=2, column=0, sticky="nsew", padx=18)
        self.card.rowconfigure(2, weight=1)
        self.text.configure(state="disabled")
        bottom = app.frame(self.card)
        bottom.grid(row=3, column=0, sticky="ew", padx=18, pady=(0, 8))
        self.metrics = app.label(bottom, "Your solution will appear here.", fg="muted", font=("Segoe UI", 9))
        self.metrics.pack(side="left")
        self.copy_button = app.button(bottom, "Copy moves", self.copy, compact=True)
        self.copy_button.pack(side="right")
        self.steps_button = app.button(bottom, "3D steps", self.show_steps, compact=True)
        self.steps_button.pack(side="right", padx=(0, 8))
        self.set("READY", "Complete a cube to see its solution.")

    def set(self, status, message, notation=None, metrics=""):
        self.notation = notation
        self.badge.configure(text=status.upper())
        self.text.configure(state="normal")
        self.text.delete("1.0", "end")
        self.text.insert("1.0", message)
        self.text.configure(state="disabled")
        self.metrics.configure(text=metrics or " ")
        self.copy_button.configure(state="normal" if notation else "disabled")
        self.steps_button.configure(state="normal" if notation is not None and status.lower() == "solved" else "disabled")

    def show_steps(self):
        self.app.open_steps(self.solver_key)

    def copy(self):
        if self.notation:
            self.app.root.clipboard_clear()
            self.app.root.clipboard_append(self.notation)
            self.app.root.update_idletasks()
            self.app.notice("Moves copied to clipboard.")


class CubeApp:
    def __init__(self, root, args):
        self.root, self.args = root, args
        self._colored = []
        self._buttons = []
        self.theme_name = "dark"
        self.mirror_camera = False
        try:
            saved = json.loads(SETTINGS.read_text(encoding="utf-8"))
            saved_theme = saved.get("theme") if isinstance(saved, dict) else None
            if saved_theme in PALETTES:
                self.theme_name = saved_theme
            self.mirror_camera = isinstance(saved, dict) and saved.get("mirror_camera") is True
        except (OSError, ValueError):
            pass
        if getattr(args, "theme", None):
            self.theme_name = args.theme
        self.palette = PALETTES[self.theme_name]
        self.mode = "manual" if getattr(args, "manual", False) else "camera"
        self.manual = ManualCube()
        self.selected = "r"
        self.camera = None
        self._camera_worker = None
        self._capture_worker = None
        self._capture_sequence = 0
        self._preview_sequence = 0
        self._overlay_sequence = 0
        self._processed_fps = 0
        self._detection_rate = FrameRate()
        self._render_image_key = None
        self._render_overlay_key = None
        self._video_item = None
        self._diagnostic_at = 0
        self._process_ms = 0
        self._camera_lock = threading.RLock()
        self._camera_snapshot = None
        self._scan_token = 0
        self._raw_frame = None
        self._preview_rate = FrameRate()
        self._frame_rate = 0
        self.calibrating = False
        self.calibration_model = None
        self.calibration_step = 0
        self._guide_fraction = None
        self._tracking_enabled = None
        self.scan_cube = None
        self.scanning = False
        self.camera_error = ""
        self.report_job = None
        self.session = None
        self.viewer = None
        self.embedded_viewer = None
        self.steps_visible = False
        self._viewer_state = None
        self._viewer_url = None
        self.report = None
        self.closed = False
        self._frame = None
        self._photo = None
        self._view_state = None
        self._after_id = None
        self._notice_until = 0
        self._last_ui = 0

        detector.CONFIG_PATH = str(Path(args.config).resolve())
        detector.OUTPUT_PATH = str(Path(args.output).resolve())
        detector.load_runtime_config(detector.CONFIG_PATH, getattr(args, "vision_backend", None))
        self._guide_fraction = detector.GUIDE_FRACTION
        self._tracking_enabled = detector.TRACKING_ENABLED
        detector.PAUSE_AT_END = False
        detector.SHOW_DEBUG_CONSOLE_TXT = args.debug
        detector.SHOW_CONTOUR_COLOR_TEXT = args.debug

        root.title("Cube Studio")
        width = min(1280, root.winfo_screenwidth() - 70)
        height = min(860, root.winfo_screenheight() - 90)
        root.geometry(f"{width}x{height}")
        root.minsize(1000, 690)
        root.protocol("WM_DELETE_WINDOW", self.close)
        self.colors(root, bg="bg")
        root.columnconfigure(0, weight=1)
        root.rowconfigure(1, weight=1)
        self._build_header()
        self._build_workspace()
        self._build_solutions()
        self._build_steps_view()
        self.footer = self.label(root, "Everything stays on this computer.", bg="bg", fg="muted", anchor="w", font=("Segoe UI", 9))
        self.footer.grid(row=3, column=0, sticky="ew", padx=28, pady=(8, 12))
        root.bind("<space>", self._space)
        root.bind("<Key-q>", lambda event: self.shortcut(event, self.reset))
        root.bind("<Key-r>", lambda event: self.shortcut(event, self.rescan))
        root.bind("<Key-u>", lambda event: self.shortcut(event, self.rescan))
        root.bind("<Key-c>", lambda event: self.shortcut(event, self.toggle_center))
        root.bind("<Key-x>", lambda event: self.shortcut(event, self.close))
        for key in ("<plus>", "<equal>", "<KP_Add>"):
            root.bind(key, lambda event: self.shortcut(event, lambda: self.adjust_guide(0.03)))
        for key in ("<minus>", "<underscore>", "<KP_Subtract>"):
            root.bind(key, lambda event: self.shortcut(event, lambda: self.adjust_guide(-0.03)))
        for number, color in enumerate(STICKERS, 1):
            root.bind(str(number), lambda event, value=color: self.choose_color(value))
        self._switch_view()
        self.apply_theme()
        self._camera_after_id = root.after(150, self._initialize_camera)
        self._after_id = root.after(40, self.tick)
        if detector.COLOR_PROFILE_ERROR:
            self.notice("Color profile could not be loaded. Calibrate colors again.", 15)

    def colors(self, widget, **roles):
        self._colored.append((widget, roles))
        widget.configure(**{option: self.palette[role] for option, role in roles.items()})
        return widget

    def frame(self, parent, bg="card", **kwargs):
        return self.colors(tk.Frame(parent, **kwargs), bg=bg)

    def box(self, parent):
        return self.colors(tk.Frame(parent, highlightthickness=1), bg="card", highlightbackground="border")

    def label(self, parent, text="", fg="text", bg="card", **kwargs):
        kwargs.setdefault("font", ("Segoe UI", 10))
        return self.colors(tk.Label(parent, text=text, **kwargs), bg=bg, fg=fg)

    def button(self, parent, text, command, primary=False, compact=False):
        button = tk.Button(parent, text=text, command=command, relief="flat", borderwidth=0,
                           padx=12 if compact else 18, pady=6 if compact else 10,
                           cursor="hand2", font=("Segoe UI", 9 if compact else 10, "bold"),
                           highlightthickness=1, takefocus=True)
        self.colors(button, bg="accent" if primary else "well", fg="accent_text" if primary else "text",
                    activebackground="accent" if primary else "hover", activeforeground="accent_text" if primary else "text",
                    disabledforeground="muted", highlightbackground="border", highlightcolor="accent")
        self._buttons.append(button)
        return button

    def _build_header(self):
        header = self.frame(self.root, bg="bg")
        header.grid(row=0, column=0, sticky="ew", padx=28, pady=(14, 12))
        self.logo = tk.Canvas(header, width=39, height=39, highlightthickness=0)
        self.colors(self.logo, bg="bg")
        self.logo.pack(side="left", padx=(0, 12))
        brand = self.frame(header, bg="bg")
        brand.pack(side="left")
        self.label(brand, "Cube Studio", bg="bg", font=("Segoe UI", 22, "bold"), anchor="w").pack(anchor="w")
        self.label(brand, "SCAN. BUILD. SOLVE.", bg="bg", fg="muted", font=("Segoe UI", 8, "bold"), anchor="w").pack(anchor="w")
        self.theme_button = self.button(header, "Light mode", self.toggle_theme, compact=True)
        self.theme_button.pack(side="right", padx=(10, 0))
        self.export_button = self.button(header, "Export report", self.export, compact=True)
        self.export_button.pack(side="right")
        self.export_button.configure(state="disabled")
        self.color_button = self.button(header, "Calibrate colors", self.start_calibration, compact=True)
        self.color_button.pack(side="right", padx=(0, 10))
        self.backend_badge = self.label(header, "LOCAL", fg="muted", bg="bg", font=("Segoe UI", 9, "bold"))
        self.backend_badge.pack(side="right", padx=16)

    def _build_workspace(self):
        work = self.frame(self.root, bg="bg")
        self.workspace = work
        work.grid(row=1, column=0, sticky="nsew", padx=28)
        work.columnconfigure(0, weight=1)
        work.columnconfigure(1, minsize=320)
        work.rowconfigure(0, weight=1)
        self.input_card = self.box(work)
        self.input_card.grid(row=0, column=0, sticky="nsew", padx=(0, 16))
        self.input_card.columnconfigure(0, weight=1)
        self.input_card.rowconfigure(1, weight=1)
        tabs = self.frame(self.input_card)
        tabs.grid(row=0, column=0, sticky="ew", padx=18, pady=14)
        self.camera_tab = self.button(tabs, "Camera scan", lambda: self.switch_mode("camera"), compact=True)
        self.camera_tab.pack(side="left")
        self.manual_tab = self.button(tabs, "Manual input", lambda: self.switch_mode("manual"), compact=True)
        self.manual_tab.pack(side="left", padx=8)
        self.input_status = self.label(tabs, "PREVIEW", fg="muted", font=("Segoe UI", 8, "bold"))
        self.input_status.pack(side="right")
        self.mirror_button = self.button(tabs, "Mirror cam: Off", self.toggle_camera_mirror, compact=True)
        self.mirror_button.pack(side="right", padx=(8, 12))

        self.camera_view = self.frame(self.input_card, bg="well")
        self.camera_view.grid(row=1, column=0, sticky="nsew", padx=18)
        self.camera_view.columnconfigure(0, weight=1)
        self.camera_view.rowconfigure(0, weight=1)
        self.video = tk.Canvas(self.camera_view, highlightthickness=0, width=620, height=300)
        self.colors(self.video, bg="well")
        self.video.grid(row=0, column=0, sticky="nsew")
        self.video.bind("<Button-1>", self.sample_calibration)

        self.manual_view = self.frame(self.input_card)
        self.manual_view.grid(row=1, column=0, sticky="nsew", padx=18)
        self.manual_view.columnconfigure(0, weight=1)
        self.manual_view.rowconfigure(1, weight=1)
        palette = self.frame(self.manual_view)
        palette.grid(row=0, column=0, sticky="ew", pady=(0, 8))
        self.swatches = {}
        for i, (color, hex_value) in enumerate(STICKERS.items()):
            palette.columnconfigure(i, weight=1)
            button = tk.Button(palette, text=COLOR_NAMES[color], bg=hex_value, fg="#152034", activebackground=hex_value,
                               activeforeground="#152034", font=("Segoe UI", 9, "bold"), relief="flat", cursor="hand2",
                               pady=7, borderwidth=0, highlightthickness=3, command=lambda value=color: self.choose_color(value))
            button.grid(row=0, column=i, sticky="ew", padx=(0, 5))
            self.swatches[color] = button
        self.editor = tk.Canvas(self.manual_view, width=620, height=270, highlightthickness=0, cursor="crosshair")
        self.colors(self.editor, bg="well")
        self.editor.grid(row=1, column=0, sticky="nsew")
        self.editor.bind("<Configure>", lambda event: self.draw_net(self.editor, self.manual.faces, True))
        self.editor.bind("<Button-1>", self.paint)
        self.editor.bind("<B1-Motion>", self.paint)
        controls = self.frame(self.input_card)
        controls.grid(row=2, column=0, sticky="ew", padx=18, pady=14)
        self.primary = self.button(controls, "Start scanning", self.primary_action, primary=True)
        self.primary.pack(side="left")
        self.rescan_button = self.button(controls, "Undo face", self.rescan)
        self.rescan_button.pack(side="left", padx=8)
        self.sample_button = self.button(controls, "Try a sample", lambda: self.fill_manual("sample"))
        self.solved_button = self.button(controls, "Solved cube", lambda: self.fill_manual("solved"))
        self.reset_button = self.button(controls, "Start over", self.reset)
        self.reset_button.pack(side="right")

        self.side = self.box(work)
        self.side.grid(row=0, column=1, sticky="nsew")
        self.side.columnconfigure(0, weight=1)
        self.side.rowconfigure(5, weight=1)
        self.side_overline = self.label(self.side, "YOUR SCAN", fg="muted", font=("Segoe UI", 9, "bold"), anchor="w")
        self.side_overline.grid(row=0, column=0, sticky="ew", padx=20, pady=(20, 8))
        self.guide_title = self.label(self.side, "Start with the red face", font=("Segoe UI", 17, "bold"),
                                      justify="left", anchor="w", wraplength=275)
        self.guide_title.grid(row=1, column=0, sticky="ew", padx=20)
        self.guide_text = self.label(self.side, "", fg="muted", justify="left", anchor="nw", wraplength=276)
        self.guide_text.grid(row=2, column=0, sticky="ew", padx=20, pady=(8, 10))
        self.progress = tk.Canvas(self.side, height=64, width=280, highlightthickness=0)
        self.colors(self.progress, bg="card")
        self.progress.grid(row=3, column=0, sticky="ew", padx=20)
        self.side_note = self.label(self.side, "Hold steady. Each face captures automatically.", fg="muted",
                                    justify="left", wraplength=275, anchor="w", font=("Segoe UI", 9))
        self.side_note.grid(row=4, column=0, sticky="ew", padx=20, pady=(0, 4))
        self.mini = tk.Canvas(self.side, height=190, width=280, highlightthickness=0)
        self.colors(self.mini, bg="card")
        self.mini.grid(row=5, column=0, sticky="nsew", padx=10)
        self.mini.bind("<Configure>", lambda event: self.draw_side())
        self.center_button = self.button(self.side, "Square centers  /  Change", self.toggle_center, compact=True)
        self.center_button.grid(row=6, column=0, sticky="ew", padx=20, pady=(6, 18))
        self.guide_controls = self.frame(self.side)
        self.guide_controls.grid(row=7, column=0, sticky="ew", padx=20, pady=(0, 18))
        self.guide_controls.columnconfigure(1, weight=1)
        self.smaller_button = self.button(self.guide_controls, "− Smaller", lambda: self.adjust_guide(-0.03), compact=True)
        self.smaller_button.grid(row=0, column=0)
        self.guide_size = self.label(self.guide_controls, "55%", fg="muted", font=("Segoe UI", 9, "bold"))
        self.guide_size.grid(row=0, column=1, padx=4)
        self.larger_button = self.button(self.guide_controls, "+ Larger", lambda: self.adjust_guide(0.03), compact=True)
        self.larger_button.grid(row=0, column=2)
        self.tracking_button = self.button(self.side, "Auto tracking: On", self.toggle_tracking, compact=True)
        self.tracking_button.grid(row=6, column=0, sticky="ew", padx=20, pady=(6, 12))

    def _build_solutions(self):
        section = self.frame(self.root, bg="bg")
        self.solution_section = section
        section.grid(row=2, column=0, sticky="ew", padx=28, pady=(10, 0))
        section.columnconfigure(0, weight=1)
        heading = self.frame(section, bg="bg")
        heading.grid(row=0, column=0, sticky="ew", pady=(0, 6))
        self.label(heading, "Two solvers. Your choice.", bg="bg", font=("Segoe UI", 12, "bold")).pack(side="left")
        self.cancel_button = self.button(heading, "Cancel solve", self.cancel_solve, compact=True)
        self.cancel_button.pack(side="right")
        self.cancel_button.configure(state="disabled")
        cards = self.frame(section, bg="bg")
        cards.grid(row=1, column=0, sticky="ew")
        cards.columnconfigure(0, weight=1, uniform="solver")
        cards.columnconfigure(1, weight=1, uniform="solver")
        self.kociemba = SolverCard(self, cards, "Kociemba", "Two-phase solution", 0)
        self.java = SolverCard(self, cards, "Java BiBFS", "Bidirectional breadth-first search", 1)

    def _build_steps_view(self):
        self.steps_view = self.frame(self.root, bg="bg")
        self.steps_view.columnconfigure(0, weight=1)
        self.steps_view.rowconfigure(1, weight=1)
        toolbar = self.frame(self.steps_view, bg="bg")
        toolbar.grid(row=0, column=0, sticky="ew", pady=(0, 10))
        self.button(toolbar, "‹ Back to cube", self.back_to_cube, compact=True).pack(side="left")
        self.label(toolbar, "3D solution steps", bg="bg", font=("Segoe UI", 12, "bold")).pack(side="left", padx=18)
        self.steps_pane = self.frame(self.steps_view, bg="bg")
        self.steps_pane.grid(row=1, column=0, sticky="nsew")
        self.steps_message = self.label(self.steps_pane, "Opening 3D viewer…", bg="bg", fg="muted", wraplength=640)

    def back_to_cube(self):
        self.steps_visible = False
        self.steps_view.grid_remove()
        self.workspace.grid()
        self.solution_section.grid()
        self.refresh()

    def apply_theme(self):
        self.palette = PALETTES[self.theme_name]
        for widget, roles in self._colored:
            widget.configure(**{option: self.palette[role] for option, role in roles.items()})
        self.theme_button.configure(text="Light mode" if self.theme_name == "dark" else "Dark mode")
        self.logo.delete("all")
        for row in range(3):
            for col in range(3):
                self.logo.create_rectangle(col * 12 + 1, row * 12 + 1, col * 12 + 10, row * 12 + 10,
                                           fill=self.palette["accent"] if row + col < 3 else self.palette["border"], outline="")
        self._switch_view()
        self.choose_color(self.selected)
        self.refresh()

    def toggle_theme(self):
        self.theme_name = "light" if self.theme_name == "dark" else "dark"
        self.apply_theme()
        if self.viewer and self.report:
            self.viewer.update_report(self.report, theme=self.theme_name)
        self._save_ui_settings()

    def _save_ui_settings(self):
        try:
            try:
                saved = json.loads(SETTINGS.read_text(encoding="utf-8"))
            except (OSError, ValueError):
                saved = {}
            if not isinstance(saved, dict):
                saved = {}
            saved.update(theme=self.theme_name, mirror_camera=self.mirror_camera)
            SETTINGS.write_text(json.dumps(saved, indent=2) + "\n", encoding="utf-8")
        except OSError:
            self.notice("This folder does not allow saving preferences.")

    def toggle_camera_mirror(self):
        self.mirror_camera = not self.mirror_camera
        self.mirror_button.configure(text="Mirror cam: " + ("On" if self.mirror_camera else "Off"))
        self._render_image_key = self._render_overlay_key = None
        self._save_ui_settings()
        if self.mode == "camera":
            self.render_video()

    def _switch_view(self):
        if self.mode == "manual":
            self.mirror_button.pack_forget()
            self.camera_view.grid_remove()
            self.manual_view.grid()
            self.rescan_button.pack_forget()
            self.sample_button.pack(side="left", padx=8)
            self.solved_button.pack(side="left")
            self.center_button.grid_remove()
            self.guide_controls.grid_remove()
            self.tracking_button.grid_remove()
            self.reset_button.configure(text="Clear cube")
        else:
            self.mirror_button.configure(text="Mirror cam: " + ("On" if self.mirror_camera else "Off"))
            self.mirror_button.pack(side="right", padx=(8, 12))
            self.manual_view.grid_remove()
            self.camera_view.grid()
            self.sample_button.pack_forget()
            self.solved_button.pack_forget()
            self.rescan_button.pack(side="left", padx=8)
            self.reset_button.configure(text="Start over")
        for button, mode in ((self.camera_tab, "camera"), (self.manual_tab, "manual")):
            button.configure(bg=self.palette["soft"] if mode == self.mode else self.palette["well"],
                             fg=self.palette["accent"] if mode == self.mode else self.palette["muted"])

    def switch_mode(self, mode):
        if self.mode == mode:
            return
        self.set_scanning(False)
        self.calibrating = False
        self.cancel_jobs()
        self.clear_results()
        self.mode = mode
        if mode == "manual" and self.camera:
            self._stop_frame_worker()
            self._guide_fraction = self.camera.guide_fraction
            self._tracking_enabled = self.camera.tracking_enabled
            self.scan_cube.clear_unlocked()
            self.camera.close()
            self.camera = None
            self._photo = None
        self._switch_view()
        if mode == "camera":
            self._initialize_camera()
        self.refresh()

    def _initialize_camera(self):
        if self._camera_after_id:
            self.root.after_cancel(self._camera_after_id)
        self._camera_after_id = None
        if self.closed or self.mode != "camera" or self.camera is not None:
            return
        self.camera_error = ""
        try:
            self.camera = detector.Camera()
            self.camera.guide_fraction = self._guide_fraction
            self.camera.set_tracking(self._tracking_enabled)
            if not self.camera.cap.isOpened():
                raise RuntimeError("Camera unavailable")
            if self.scan_cube is not None:
                self.camera.cube_map = self.scan_cube
            self.scan_cube = self.camera.cube_map
            self._camera_snapshot = {"index": self.scan_cube.index,
                                     "faces": self.scan_cube.raw_faces_by_notation(),
                                     "history": list(self.scan_cube.history)}
            self._camera_worker = LatestFrameWorker(self._process_camera_frame)
            self._capture_worker = CameraCapture(self.camera.cap)
        except (RuntimeError, cv.error) as exc:
            self.camera_error = "Camera unavailable. Connect a webcam or use Manual input."
            if self.camera:
                self.camera.close()
            self.camera = None
        self.refresh()

    def _invalidate_frames(self):
        self._scan_token += 1
        if self._camera_worker:
            self._camera_worker.invalidate()

    def _stop_frame_worker(self):
        worker, self._camera_worker = self._camera_worker, None
        self._scan_token += 1
        if worker:
            worker.close()
        capture, self._capture_worker = self._capture_worker, None
        if capture:
            capture.close()
            if self.camera:
                self.camera._capture_released = capture.released
        self._camera_snapshot = None
        self._raw_frame = None
        self._frame = None
        self._preview_rate.reset()
        self._frame_rate = 0
        self._processed_fps = 0
        self._detection_rate.reset()
        self._capture_sequence = 0
        self._preview_sequence += 1
        self._overlay_sequence += 1
        self._render_image_key = None
        self._render_overlay_key = None

    def _process_camera_frame(self, frame, context):
        """The worker owns detection; Tk receives an image and copied scan state."""
        raw = frame.copy()
        with self._camera_lock:
            camera = self.camera
            if camera is None:
                return None
            current = context["token"] == self._scan_token
            if current and not context["calibrating"]:
                camera.process_frame(frame, accumulate=context["accumulate"] and self.scanning)
            cube = camera.cube_map
            tracker = camera.tracker
            snapshot = {"frame": frame, "raw": raw, "index": cube.index,
                    "faces": cube.raw_faces_by_notation(), "history": list(cube.history),
                    "status": camera.tracking_status, "complete": cube.index == -1,
                    "quad": None if camera.grid_quad is None else camera.grid_quad.copy(),
                    "source_shape": raw.shape[:2], "captured_at": context.get("captured_at", time.monotonic()),
                    "reason": getattr(tracker, "reason", ""),
                    "confidence": getattr(tracker, "confidence", 0),
                    "stable_progress": getattr(tracker, "stable_progress", 0),
                    "grid_evidence": getattr(tracker, "grid_evidence", 0),
                    "sharpness": getattr(tracker, "sharpness", 0),
                    "movement": getattr(tracker, "movement", 0),
                    "reanchor_rejected": getattr(tracker, "reanchor_rejected", False),
                    "fit_confidence": getattr(tracker, "fit_confidence", 0),
                    "fit_quality": dict(getattr(tracker, "fit_quality", {})),
                    "read_quality": dict(detector.GRID_DETECTOR.read_quality),
                    "readings": cube.total_readings,
                    "backend": detector.GRID_DETECTOR.ops.info}
        if current and getattr(self.args, "debug_snapshot", False):
            metadata = {key: value for key, value in snapshot.items() if key not in ("frame", "raw", "quad")}
            metadata.update(pid=os.getpid(), captured_at_utc=time.time(),
                            quad=None if snapshot["quad"] is None else snapshot["quad"].tolist())
            capture_requested_snapshot(APP_ROOT, raw, frame, metadata)
        return snapshot

    def set_scanning(self, enabled):
        self._invalidate_frames()
        with self._camera_lock:
            self.scanning = bool(enabled)

    def _current_index(self):
        if self._camera_snapshot:
            return self._camera_snapshot["index"]
        return self.scan_cube.index if self.scan_cube else 2

    def start_calibration(self):
        if self.mode != "camera":
            self.switch_mode("camera")
        if self.camera is None:
            self.notice("Connect a webcam to calibrate colors, or use Manual input.", 10)
            return
        self.set_scanning(False)
        self.cancel_jobs()
        self.clear_results()
        self.calibration_model = ColorModel(detector.GRID_CONFIG)
        self.calibration_step = 0
        self.calibrating = True
        self._raw_frame = None
        self._invalidate_frames()
        self.notice("Click the red center sticker in the camera preview.", 120)
        self.refresh()

    def sample_calibration(self, event):
        if not self.calibrating or self._raw_frame is None:
            return
        height, width = self._raw_frame.shape[:2]
        scale = min(self.video.winfo_width() / width, self.video.winfo_height() / height)
        x = (event.x - (self.video.winfo_width() - width * scale) / 2) / scale
        y = (event.y - (self.video.winfo_height() - height * scale) / 2) / scale
        if not (0 <= x < width and 0 <= y < height):
            self.notice("Click a center sticker inside the camera image.")
            return
        if self.mirror_camera:
            x = width - 1 - x
        name = SCAN[self.calibration_step][2].lower()
        try:
            rgb, quality = ColorModel.sample_patch(self._raw_frame, x, y)
            self.calibration_model.add_sample(name, rgb)
            if self.calibration_step == 5:
                self.calibration_model.save(detector.COLOR_PROFILE_PATH)
                self.calibrating = False
                self.reset()
                self.notice("Colors calibrated. Start a fresh scan in the same light.", 12)
            else:
                self.calibration_step += 1
                name = SCAN[self.calibration_step][2].lower()
                self.notice(f"Sample saved. Now click the {name} center sticker.", 120)
                self.refresh()
        except (ValueError, OSError) as exc:
            self.notice(str(exc), 15)

    def cancel_calibration(self):
        self.calibrating = False
        self.calibration_model = None
        self._invalidate_frames()
        self.notice("Calibration cancelled. Your saved color profile is kept.")
        self.refresh()

    def choose_color(self, color):
        self.selected = color
        for value, button in self.swatches.items():
            button.configure(highlightbackground=self.palette["text"] if value == color else self.palette["card"],
                             highlightcolor=self.palette["text"])
        if self.mode == "manual":
            self.side_note.configure(text=f"Painting {COLOR_NAMES[color].lower()}. Click or drag across stickers. Centers stay fixed.")

    def paint(self, event):
        for face, index, (x1, y1, x2, y2) in net_cells(self.editor.winfo_width(), self.editor.winfo_height()):
            if x1 <= event.x <= x2 and y1 <= event.y <= y2:
                if index == 4:
                    self.notice("Center colors define each face and stay fixed.")
                elif self.manual.paint(face, index, self.selected):
                    self.cancel_jobs()
                    self.clear_results()
                    self.refresh()
                return

    def fill_manual(self, kind):
        self.cancel_jobs()
        self.clear_results()
        if kind == "sample":
            self.manual.load_state(SAMPLE)
        elif kind == "solved":
            self.manual.solved()
        else:
            self.manual.clear()
        self.refresh()

    def draw_net(self, canvas, faces, editable=False):
        canvas.delete("all")
        for face, index, (x1, y1, x2, y2) in net_cells(canvas.winfo_width(), canvas.winfo_height()):
            color = faces.get(face, ["_"] * 9)[index]
            if index == 4 and color == "_":
                color = COLORS[face]
            fill = STICKERS.get(color, self.palette["empty"])
            canvas.create_rectangle(x1, y1, x2, y2, fill=fill, outline="", tags=f"{face}:{index}")
            if index == 4:
                canvas.create_text((x1 + x2) / 2, (y1 + y2) / 2, text=face,
                                   fill="#152034", font=("Segoe UI", 11 if editable else 9, "bold"))

    def draw_side(self):
        self.progress.delete("all")
        if self.mode == "camera":
            step = self.calibration_step if self.calibrating else scan_position(self._current_index())
            for i, (_, face, name, _, _) in enumerate(SCAN):
                x = 17 + i * 48
                if i < 5:
                    self.progress.create_line(x + 10, 15, x + 38, 15, fill=self.palette["border"], width=2)
                self.progress.create_oval(x - 10, 5, x + 10, 25, fill=STICKERS[COLORS[face]],
                                          outline=self.palette["text"] if i == step else "", width=2)
                self.progress.create_text(x, 15, text="✓" if i < step else str(i + 1), fill="#152034", font=("Segoe UI", 8, "bold"))
                self.progress.create_text(x, 42, text=name, fill=self.palette["muted"], font=("Segoe UI", 8))
            if self.calibrating:
                self.mini.delete("all")
                samples = self.calibration_model.samples
                for i, (_, _, name, *_rest) in enumerate(SCAN):
                    x = 16 + (i % 2) * self.mini.winfo_width() / 2
                    y = 20 + (i // 2) * 42
                    rgb = samples.get(name.lower())
                    fill = "#%02x%02x%02x" % rgb if rgb else self.palette["empty"]
                    self.mini.create_rectangle(x, y - 8, x + 20, y + 12, fill=fill, outline="")
                    self.mini.create_text(x + 28, y + 2, text=name, anchor="w", fill=self.palette["text"], font=("Segoe UI", 9))
            else:
                if self._camera_snapshot:
                    faces = self._camera_snapshot["faces"]
                else:
                    faces = {}
                self.draw_net(self.mini, faces)
        else:
            w = max(260, self.progress.winfo_width() - 4)
            self.progress.create_rectangle(0, 6, w, 12, fill=self.palette["border"], outline="")
            if self.manual.filled:
                self.progress.create_rectangle(0, 6, w * self.manual.filled / 54, 12, fill=self.palette["accent"], outline="")
            self.progress.create_text(0, 33, anchor="w", text=f"{self.manual.filled} / 54 stickers filled", fill=self.palette["text"], font=("Segoe UI", 10, "bold"))
            self.mini.delete("all")
            counts = self.manual.counts
            column_width = self.mini.winfo_width() / 2
            for i, (color, value) in enumerate(STICKERS.items()):
                x = (i % 2) * column_width + 15
                y = 18 + (i // 2) * 46
                self.mini.create_oval(x, y - 6, x + 12, y + 6, fill=value, outline=self.palette["border"])
                self.mini.create_text(x + 22, y - 2, text=COLOR_NAMES[color], anchor="w", fill=self.palette["text"], font=("Segoe UI", 9))
                self.mini.create_text(x + 22, y + 16, text=f"{counts[color]} / 9", anchor="w", fill=self.palette["error"] if counts[color] > 9 else self.palette["muted"], font=("Segoe UI", 9, "bold"))
            self.draw_net(self.editor, self.manual.faces, True)

    def refresh(self):
        busy = self.report_job is not None
        self.video.configure(cursor="crosshair" if self.calibrating else "arrow")
        info = detector.GRID_DETECTOR.ops.info
        backend = "GPU + CPU" if info["active"] else "GPU warming…" if info["state"] == "warming" else "CPU"
        self.backend_badge.configure(text=backend + (f"  ·  {self._frame_rate:.0f} FPS" if self.mode == "camera" and self._frame_rate else ""))
        self.color_button.configure(text="Calibrating…" if self.calibrating else "Recalibrate colors" if detector.COLOR_MODEL.ready else "Calibrate colors",
                                    state="disabled" if self.calibrating else "normal")
        java_pending = self.session is not None and self.session.job is not None
        self.cancel_button.configure(state="normal" if busy or java_pending else "disabled")
        self.export_button.configure(state="normal" if self.report is not None else "disabled")
        self.center_button.configure(text=("Circle" if detector.HAS_CIRCLE_CENTER else "Square") + " centers  /  Change",
                                     state="normal" if self.mode == "camera" and detector.DETECTION_MODE == "contour" else "disabled")
        grid_mode = self.mode == "camera" and detector.DETECTION_MODE == "grid"
        tracking = self.camera.tracking_enabled if self.camera else self._tracking_enabled
        if grid_mode:
            self.center_button.grid_remove()
            self.tracking_button.grid()
            if tracking:
                self.guide_controls.grid_remove()
            else:
                self.guide_controls.grid()
        elif self.mode == "camera":
            self.guide_controls.grid_remove()
            self.tracking_button.grid_remove()
            self.center_button.grid()
        else:
            self.center_button.grid_remove()
            self.guide_controls.grid_remove()
            self.tracking_button.grid_remove()
        self.tracking_button.configure(text="Auto tracking: " + ("On" if tracking else "Off"),
                                       state="normal" if grid_mode and self.camera is not None else "disabled")
        fraction = self.camera.guide_fraction if self.camera else self._guide_fraction
        self.guide_size.configure(text=f"{fraction:.0%}")
        self.smaller_button.configure(state="normal" if grid_mode and self.camera is not None and fraction > 0.2 else "disabled")
        self.larger_button.configure(state="normal" if grid_mode and self.camera is not None and fraction < 0.95 else "disabled")
        if self.mode == "manual":
            self.side_overline.configure(text="BUILD YOUR CUBE")
            self.guide_title.configure(text="Paint your cube")
            self.guide_text.configure(text="Choose a color above, then paint the stickers. Each color needs exactly 9 squares.")
            self.choose_color(self.selected)
            self.primary.configure(text="Checking cube…" if busy else "Solve cube", state="normal" if self.manual.ready and not busy else "disabled")
            self.input_status.configure(text="READY TO SOLVE" if self.manual.ready else "COLOR EDITOR")
        else:
            step = scan_position(self._current_index())
            self.side_overline.configure(text=f"YOUR SCAN  ·  {min(step, 6)} / 6 FACES")
            if step < 6:
                self.guide_title.configure(text=SCAN[step][3])
                self.guide_text.configure(text=SCAN[step][4])
                if grid_mode and tracking:
                    snapshot = self._camera_snapshot or {}
                    status = snapshot.get("status", self.camera.tracking_status if self.camera else "searching")
                    if status == "tracking":
                        readings = snapshot.get("readings", 0)
                        instruction = f"Clear face. {readings} / {detector.MIN_COLOR_COUNT_THRESHOLD} readings. " if self.scanning else "The grid follows your cube. "
                    elif status == "unstable":
                        instruction = (snapshot.get("reason") or "Hold steady and keep all 9 stickers visible.") + " "
                    else:
                        instruction = (snapshot.get("reason") or "Show the requested face clearly. The grid will find it.") + " "
                elif grid_mode:
                    instruction = "Align the whole face inside the grid. " if not detector.AUTO_LOCATE else "Present a clear face to the camera. "
                else:
                    instruction = "Orient your cube. "
                self.side_note.configure(text=instruction + ("Hold steady to capture." if self.scanning else "Press Start or Resume when ready."))
            else:
                self.guide_title.configure(text="All six faces captured")
                self.guide_text.configure(text="Keep the same orientation when following the solution: blue on top, red in front.")
                self.side_note.configure(text="Checking your cube…" if busy else "Your solutions appear below.")
            text = "Checking cube…" if busy else "Pause scan" if self.scanning else "Calibrate colors" if not detector.COLOR_MODEL.ready else "New scan" if step == 6 else "Resume scan" if step else "Start scanning"
            self.primary.configure(text=text, state="normal" if self.camera is not None and not busy else "disabled")
            self.rescan_button.configure(text="Undo face", state="normal" if self.scan_cube is not None else "disabled", command=self.rescan)
            if self.camera_error:
                status_text = "CAMERA OFFLINE"
            elif step == 6:
                status_text = "CHECKING CUBE" if busy else "SCAN COMPLETE"
            elif grid_mode and tracking and self.camera is not None:
                status_text = {"searching": "FINDING CUBE", "unstable": "HOLD STEADY", "tracking": "CUBE TRACKED"}.get(self.camera.tracking_status, "FINDING CUBE")
                if self.scanning and self.camera.tracking_status == "tracking":
                    status_text = "CAPTURING"
            else:
                status_text = "SCANNING" if self.scanning else "PREVIEW"
            self.input_status.configure(text=status_text)
            if self.calibrating:
                name = SCAN[self.calibration_step][2].lower()
                self.side_overline.configure(text=f"COLOR CALIBRATION  ·  {self.calibration_step + 1} / 6")
                self.guide_title.configure(text=f"Click the {name}\ncenter sticker")
                self.guide_text.configure(text="Show that face to the camera, then click its center in the live preview.")
                self.side_note.configure(text="Sample the flat middle of the sticker. Keep the same light for all six colors.")
                self.primary.configure(text="Cancel calibration", state="normal")
                self.rescan_button.configure(text="Retake last", state="normal" if self.calibration_step else "disabled")
                self.input_status.configure(text="CLICK A CENTER")
                self.tracking_button.configure(state="disabled")
                self.smaller_button.configure(state="disabled")
                self.larger_button.configure(state="disabled")
        self.draw_side()

    def _space(self, event):
        if self.steps_visible:
            return "break"
        if isinstance(event.widget, tk.Text):
            return
        self.primary_action()
        return "break"

    def shortcut(self, event, action):
        # Preserve text selection/copy shortcuts inside solution cards.
        if isinstance(event.widget, tk.Text) or event.state & 0xC:
            return
        action()
        return "break"

    def primary_action(self):
        if self.calibrating:
            self.cancel_calibration()
            return
        if self.report_job is not None:
            return
        if self.mode == "manual":
            if self.manual.ready:
                self.start_solve("manual", self.manual.state())
        elif self.camera is not None:
            if not detector.COLOR_MODEL.ready:
                self.start_calibration()
                return
            if self._current_index() == -1:
                self.reset()
            self.set_scanning(not self.scanning)
        self.refresh()

    def start_solve(self, source, payload):
        self.cancel_jobs()
        self.set_scanning(False)
        self.clear_results()
        try:
            self.report_job = ReportJob(source, payload)
            self.kociemba.set("Checking", "Checking the cube and finding a solution…")
            self.java.set("Waiting", "Waiting for the cube check to finish.")
            self.notice("Checking colors and cube legality…", 120)
        except (OSError, RuntimeError) as exc:
            self.show_error(str(exc))
        self.refresh()

    def clear_results(self):
        if self.steps_visible:
            self.back_to_cube()
        if self.embedded_viewer:
            self.embedded_viewer.close()
            self.embedded_viewer = None
        self._viewer_state = self._viewer_url = None
        self.report = None
        self._view_state = None
        self.kociemba.set("Ready", "Complete a cube to see its solution.")
        self.java.set("Ready", "The Java solver will use the same cube.")
        self.export_button.configure(state="disabled")

    def cancel_jobs(self):
        if self.report_job:
            self.report_job.close()
            self.report_job = None
        if self.session:
            session = self.session
            self.session = None
            try:
                session.close()
            except OSError as exc:
                self.notice(f"Solve stopped, but the report could not be saved: {exc}", 12)
            if self.viewer and self.report:
                self.viewer.update_report(self.report, theme=self.theme_name)

    def cancel_solve(self):
        had_check = self.report_job is not None
        self.cancel_jobs()
        if had_check:
            self.kociemba.set("Cancelled", "Cube check cancelled. You can edit or try again.")
            self.java.set("Not run", "No cube was sent to Java.")
        elif self.report:
            self.update_results()
        self.notice("Solve cancelled. Your cube input is kept.")
        self.refresh()

    def show_error(self, message):
        self.kociemba.set("Needs attention", message)
        self.java.set("Not run", "Review the cube input, then try again.")
        self.notice(message, 12)

    def update_results(self):
        if not self.report:
            return
        report = self.report
        if report["valid"]:
            notation = report["notation"] or ""
            self.kociemba.set("Solved", notation or "Already solved. No moves needed.", notation,
                              f"{len(notation.split())} moves" + (" · scan corrected" if report["corrections"] else ""))
        else:
            problems = report.get("problems", [])
            message = " ".join(item["message"] for item in problems[:2]) or "Review the colors and face orientations."
            self.kociemba.set("Check colors", message)
        result = report["java_solver"]
        status = result["status"]
        if status == "solved":
            notation = result["notation"] or ""
            self.java.set("Solved", notation or "Already solved. No moves needed.", notation,
                          f"{len(notation.split())} moves · {result['elapsed_ms'] / 1000:.2f} s")
        elif status == "pending":
            self.java.set("Searching", "Searching for a solution…", metrics=f"Up to {self.args.java_timeout:g} seconds")
        else:
            messages = {"timed_out": "Search time limit reached. The Kociemba solution is still available.",
                        "cancelled": "Search cancelled. Your cube and Kociemba result are kept.",
                        "not_run": "Review the colors before solving this cube.",
                        "missing_java": "Java was not found. Kociemba is still available.",
                        "process_failed": "Java could not finish this search. Try Kociemba's solution."}
            message = messages.get(status, (result.get("error") or {}).get("message", "Java could not finish."))
            self.java.set(status.replace("_", " "), message)
        if self.viewer:
            self.viewer.update_report(report, theme=self.theme_name)
        self.refresh()

    def open_steps(self, solver_key):
        if self.report is None:
            return
        try:
            if self.viewer is None:
                self.viewer = ViewerServer()
            self.set_scanning(False)
            self.steps_visible = True
            self.workspace.grid_remove()
            self.solution_section.grid_remove()
            self.steps_view.grid(row=1, column=0, sticky="nsew", padx=28)
            if self._viewer_state != self.report.get("state") or not self._viewer_url:
                self._viewer_url = self.viewer.open_report(self.report, theme=self.theme_name, solver=solver_key) + "&embedded=1"
                self._viewer_state = self.report.get("state")
            if self.embedded_viewer is None:
                self.steps_message.configure(text="Opening 3D viewer…")
                self.steps_message.place(relx=0.5, rely=0.5, anchor="center")
                self.embedded_viewer = EmbeddedViewer(self.steps_pane, background=self.palette["bg"])
            self.embedded_viewer.load(self._viewer_url)
            self.embedded_viewer.select_solver(solver_key)
            self.notice("Use <, >, and Replay twist. Back to cube returns to your input.", 8)
        except (OSError, RuntimeError, ValueError) as exc:
            self.steps_message.configure(text="Could not open the embedded 3D viewer: " + str(exc))
            self.steps_message.place(relx=0.5, rely=0.5, anchor="center")
            self.notice("Could not open the embedded 3D viewer: " + str(exc), 12)

    def reset(self):
        self.set_scanning(False)
        self.calibrating = False
        self.cancel_jobs()
        self.clear_results()
        if self.mode == "manual":
            self.manual.clear()
        else:
            with self._camera_lock:
                detector.PAUSE_AT_END = False
                detector.load_runtime_config(detector.CONFIG_PATH, getattr(self.args, "vision_backend", None))
                self._guide_fraction = detector.GUIDE_FRACTION
                self._tracking_enabled = detector.TRACKING_ENABLED
                self.scan_cube = detector.CubeMap()
                if self.camera:
                    self.camera.cube_map = self.scan_cube
                    self.camera.guide_fraction = self._guide_fraction
                    self.camera.tracker = None
                    self.camera.set_tracking(self._tracking_enabled)
                self._camera_snapshot = {"index": self.scan_cube.index,
                                         "faces": self.scan_cube.raw_faces_by_notation(),
                                         "history": list(self.scan_cube.history)}
            if not self.camera:
                self._initialize_camera()
        self.notice("Ready for a fresh cube.")
        self.refresh()

    def rescan(self):
        if self.calibrating:
            self.calibration_step = max(0, self.calibration_step - 1)
            samples = self.calibration_model.samples
            self.calibration_model = ColorModel(detector.GRID_CONFIG)
            for _, _, name, *_ in SCAN[:self.calibration_step]:
                self.calibration_model.add_sample(name.lower(), samples[name.lower()])
            self.notice("Click that center again in the live preview.", 120)
            self.refresh()
            return
        if self.mode != "camera" or self.scan_cube is None:
            return
        self.set_scanning(False)
        self.cancel_jobs()
        self.clear_results()
        with self._camera_lock:
            message = self.scan_cube.undo_last()
            if self.camera:
                self.camera.reset_tracking()
            self._camera_snapshot = {"index": self.scan_cube.index,
                                     "faces": self.scan_cube.raw_faces_by_notation(),
                                     "history": list(self.scan_cube.history)}
        self.notice(message + ". Orient the cube, then resume scanning.")
        self.refresh()

    def adjust_guide(self, delta):
        if self.mode != "camera" or detector.DETECTION_MODE != "grid" or self.camera is None or self.camera.tracking_enabled:
            return
        self._invalidate_frames()
        with self._camera_lock:
            self.camera.adjust_guide(delta)
            self._guide_fraction = self.camera.guide_fraction
        self.refresh()

    def toggle_tracking(self):
        if self.mode != "camera" or detector.DETECTION_MODE != "grid" or self.camera is None:
            return
        self.set_scanning(False)
        with self._camera_lock:
            self._tracking_enabled = not self.camera.tracking_enabled
            self.camera.set_tracking(self._tracking_enabled)
        self.notice("Automatic face tracking enabled." if self._tracking_enabled else "Guided scanning enabled. Align the cube inside the grid.")
        self.refresh()

    def toggle_center(self):
        if self.mode != "camera" or detector.DETECTION_MODE != "contour":
            return
        try:
            path = Path(detector.CONFIG_PATH)
            config = json.loads(path.read_text(encoding="utf-8"))
            config["hasCircleCenter"] = "false" if detector.HAS_CIRCLE_CENTER else "true"
            path.write_text(json.dumps(config, indent=4) + "\n", encoding="utf-8")
            self.reset()
        except (OSError, ValueError) as exc:
            self.notice(f"Could not save center mode: {exc}", 10)

    def export(self):
        if self.report is None:
            return
        path = filedialog.asksaveasfilename(parent=self.root, title="Export cube report", defaultextension=".json",
                                          initialfile="cube_state.json", filetypes=[("JSON report", "*.json")])
        if path:
            try:
                write_cube_report(path, self.report)
                self.notice(f"Report exported to {Path(path).name}.")
            except OSError as exc:
                self.notice(f"Could not export report: {exc}", 10)

    def notice(self, text, duration=5):
        self.footer.configure(text=text)
        self._notice_until = time.monotonic() + duration

    def render_video(self):
        canvas = self.video
        width, height = max(1, canvas.winfo_width()), max(1, canvas.winfo_height())
        if self._frame is not None and not self.camera_error:
            fh, fw = self._frame.shape[:2]
            scale = min(width / fw, height / fh)
            image_key = (self._preview_sequence, width, height, self.mirror_camera)
            if self._render_image_key != image_key:
                resized = cv.resize(self._frame, (max(1, int(fw * scale)), max(1, int(fh * scale))))
                if self.mirror_camera:
                    resized = cv.flip(resized, 1)
                rgb = cv.cvtColor(resized, cv.COLOR_BGR2RGB)
                data = f"P6\n{rgb.shape[1]} {rgb.shape[0]}\n255\n".encode() + rgb.tobytes()
                self._photo = tk.PhotoImage(data=data, format="PPM")
                canvas.delete("message")
                if self._video_item is None:
                    self._video_item = canvas.create_image(width / 2, height / 2, image=self._photo)
                else:
                    canvas.itemconfigure(self._video_item, image=self._photo)
                    canvas.coords(self._video_item, width / 2, height / 2)
                self._render_image_key = image_key
            snapshot = self._camera_snapshot or {}
            fresh = time.monotonic() - snapshot.get("captured_at", 0) < 0.12
            overlay_key = (self._overlay_sequence, width, height, self.calibrating, fresh, self.mirror_camera)
            if overlay_key != self._render_overlay_key:
                canvas.delete("overlay")
                quad = snapshot.get("quad")
                if quad is not None and fresh and not self.calibrating:
                    source_height, source_width = snapshot["source_shape"]
                    sx, sy = fw / source_width, fh / source_height
                    offset_x, offset_y = (width - fw * scale) / 2, (height - fh * scale) / 2
                    points = [((fw - 1 - float(x) * sx if self.mirror_camera else float(x) * sx) * scale + offset_x,
                               float(y) * sy * scale + offset_y) for x, y in quad]
                    color = "#81e8bd" if snapshot.get("status") == "tracking" else "#f6d75d"
                    canvas.create_polygon(*[value for point in points for value in point], fill="", outline=color, width=2, tags="overlay")
                    transform = cv.getPerspectiveTransform(
                        np.array([[0, 0], [300, 0], [300, 300], [0, 300]], dtype=np.float32),
                        np.array(points, dtype=np.float32))
                    for k in (100, 200):
                        for ends in (((k, 0), (k, 300)), ((0, k), (300, k))):
                            projected = cv.perspectiveTransform(np.array([ends], dtype=np.float32), transform)[0]
                            canvas.create_line(*projected.ravel().tolist(), fill=color, width=1, tags="overlay")
                self._render_overlay_key = overlay_key
        else:
            key = ("offline", self.camera_error, width, height, self.theme_name)
            if self._render_image_key == key:
                return
            canvas.delete("all")
            self._video_item = None
            canvas.create_text(width / 2, height / 2 - 15, text="Camera unavailable" if self.camera_error else "Opening camera…",
                               fill=self.palette["text"], font=("Segoe UI", 18, "bold"), tags="message")
            canvas.create_text(width / 2, height / 2 + 25, text="Use Manual input to build a cube without a webcam." if self.camera_error else "Your live preview will appear here.",
                               fill=self.palette["muted"], font=("Segoe UI", 10), width=max(100, width - 60), tags="message")
            self._render_image_key = key

    def _write_vision_status(self, now):
        if now - self._diagnostic_at < 1 or self.mode != "camera":
            return
        self._diagnostic_at = now
        snapshot = self._camera_snapshot or {}
        data = {"pid": os.getpid(), "preview_fps": round(self._frame_rate, 1),
                "detection_fps": round(self._processed_fps, 1), "processing_ms": round(self._process_ms, 1),
                "tracking": snapshot.get("status", "searching"), "reason": snapshot.get("reason", ""),
                "readings": snapshot.get("readings", 0), "scan_index": snapshot.get("index", 2),
                "calibrated": detector.COLOR_MODEL.ready, "scanning": self.scanning,
                "mirror_camera": self.mirror_camera,
                "backend": detector.GRID_DETECTOR.ops.info,
                "grid_evidence": snapshot.get("grid_evidence", 0),
                "sharpness": snapshot.get("sharpness", 0),
                "movement": snapshot.get("movement", 0),
                "reanchor_rejected": snapshot.get("reanchor_rejected", False),
                "fit_confidence": snapshot.get("fit_confidence", 0),
                "fit_quality": snapshot.get("fit_quality", {}),
                "read_quality": snapshot.get("read_quality", {}),
                "dropped_detection_frames": self._camera_worker.dropped if self._camera_worker else 0}
        try:
            path = APP_ROOT / ".vision_status.json"
            temporary = path.with_suffix(f".{os.getpid()}.tmp")
            temporary.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
            temporary.replace(path)
        except OSError:
            pass

    def tick(self):
        if self.closed:
            return
        try:
            if self.mode == "camera":
                if self.camera is not None:
                    result = self._camera_worker.poll() if self._camera_worker else None
                    if result is not None:
                        if result.error:
                            raise RuntimeError("Camera processing failed: " + result.error)
                        if result.value is not None:
                            self._camera_snapshot = result.value
                            self._overlay_sequence = result.sequence
                            self._process_ms = result.elapsed_ms
                            now = time.monotonic()
                            self._detection_rate.record(now)
                            if self.scanning and result.value["complete"]:
                                self.start_solve("camera", result.value["faces"])
                    captured = self._capture_worker.poll() if self._capture_worker else None
                    if captured is not None and captured.error:
                        self.camera_error = "Camera disconnected. Use Manual input or start over to reconnect."
                        self.set_scanning(False)
                        self._stop_frame_worker()
                        self.camera.close()
                        self.camera = None
                        self.refresh()
                    elif captured is not None:
                        frame = captured.frame
                        if not detector.LOW_RES_CAMERA:
                            frame = cv.resize(frame, (800, 600))
                        self._capture_sequence = captured.sequence
                        self._preview_sequence += 1
                        self._frame = self._raw_frame = frame
                        now = captured.captured_at
                        self._preview_rate.record(now)
                        if not self.steps_visible:
                            self._camera_worker.submit(frame, {"accumulate": self.scanning,
                                                          "calibrating": self.calibrating,
                                                          "token": self._scan_token,
                                                          "captured_at": captured.captured_at})
                now = time.monotonic()
                self._frame_rate = self._preview_rate.rate_at(now)
                self._processed_fps = self._detection_rate.rate_at(now)
                if not self.steps_visible:
                    self.render_video()
            if self.embedded_viewer:
                state = self.embedded_viewer.poll()
                if state == "ready":
                    self.steps_message.place_forget()
                elif state == "failed":
                    error = self.embedded_viewer.error or "The 3D renderer stopped"
                    self.embedded_viewer.close()
                    self.embedded_viewer = None
                    self.steps_message.configure(text="Could not display 3D steps: " + error)
                    self.steps_message.place(relx=0.5, rely=0.5, anchor="center")
            if self.report_job is not None:
                outcome = self.report_job.poll()
                if outcome:
                    self.report_job = None
                    kind, data = outcome
                    if kind == "error":
                        self.show_error(data)
                    else:
                        self.report = data
                        self.session = ReportSession(data, self.args.output, timeout=self.args.java_timeout,
                                                     heap_mb=self.args.java_heap_mb, java=self.args.java).start()
                        self.update_results()
                        self.notice(f"Cube report saved to {Path(self.args.output).name}.", 8)
                    self.refresh()
            if self.session is not None and self.session.poll():
                self.update_results()
            now = time.monotonic()
            self._write_vision_status(now)
            if now - self._last_ui > 0.18:
                self.refresh()
                self._last_ui = now
            if now > self._notice_until:
                if self.steps_visible:
                    hint = "< Previous   ·   > Next   ·   Replay twist   ·   Back to cube returns to your input"
                elif self.mode == "manual":
                    hint = "1–6: choose color   ·   Space: solve"
                elif self.camera and self.camera.tracking_enabled and detector.DETECTION_MODE == "grid":
                    hint = "Space: start / pause   ·   U / R: undo face   ·   The grid follows your cube"
                else:
                    hint = "Space: start / pause   ·   U / R: undo face   ·   + / −: guide size"
                self.footer.configure(text=hint + "   ·   Everything stays on this computer.")
        except (OSError, RuntimeError, ValueError, cv.error) as exc:
            self.cancel_jobs()
            self.scanning = False
            self.show_error(str(exc))
            self.refresh()
        self._after_id = self.root.after(8 if self.mode == "camera" else 35, self.tick)

    def close(self):
        if self.closed:
            return
        self.closed = True
        if self._after_id:
            self.root.after_cancel(self._after_id)
        if self._camera_after_id:
            self.root.after_cancel(self._camera_after_id)
        self.scanning = False
        error = None
        cleanups = [self._stop_frame_worker, self.cancel_jobs]
        if self.embedded_viewer:
            cleanups.append(self.embedded_viewer.close)
        if self.camera:
            cleanups.append(self.camera.close)
        if self.viewer:
            cleanups.append(self.viewer.close)
        # PhotoImage deletes its Tcl image on finalization. Release it while
        # the interpreter is alive and this code still runs on the Tk thread.
        self._photo = None
        cleanups.append(self.root.destroy)
        for cleanup in cleanups:
            try:
                cleanup()
            except Exception as exc:
                if error is None:
                    error = exc
        if error is not None:
            raise error


def main(args):
    root = tk.Tk()
    app = None
    try:
        app = CubeApp(root, args)
        root.mainloop()
    finally:
        try:
            if app is not None and not app.closed:
                app.close()
            elif app is None:
                root.destroy()
        finally:
            # Collect destroyed Tk widget cycles on their owning thread.
            app = root = None
            gc.collect()
