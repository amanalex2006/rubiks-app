import numpy as np
import cv2 as cv

import argparse
import json
import copy
import os

from math import pi, dist
from scanner.constants import *
from scanner.cube_state import FACE_ORDER
from scanner.grid_detect import GridDetector
from scanner.color_model import ColorModel
from scanner.grid_tracking import FaceTracker
from bridge.report_job import ReportJob
from bridge.report_session import ReportSession
from bridge.java_solver import solver_result
from scanner.result_display import draw_solution_panel

import time

PAUSE_AT_END = False
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(BASE_DIR, "config.json")
OUTPUT_PATH = "cube_state.json"
DETECTION_MODE = "grid"
GUIDE_FRACTION = 0.55
AUTO_LOCATE = False
TRACKING_ENABLED = True
GRID_DETECTOR = None
COLOR_MODEL = None
COLOR_PROFILE_ERROR = ""
COLOR_PROFILE_PATH = os.path.join(os.path.dirname(BASE_DIR), ".color_calibration.json")
GRID_CONFIG = {}
COLORS = ["yellow", "green", "blue", "red", "white", "orange"]

class CubeMap:
    nxt = {
        0: 5,
        1: 0,
        2: 3,
        3: 4,
        4: 1,
        5: -1
    }
    bk = {
        0: 1,
        1: 4,
        2: -1,
        3: 2,
        4: 3,
        5: 0
    }

    class Color:

        def __init__(self) -> None:
            pass

        freq = dict()

        max_freq = [[0 for i in range(3)] for j in range(3)]

        name = [['X' for i in range(3)] for j in range(3)]

        from_index = ['b', 'w', 'r', 'y', 'o', 'g']

        # Assign each color a number from 0 to 5 inclusive.
        to_index = {'b': 0, 'w': 1, 'r': 2, 'y': 3, 'o': 4, 'g': 5,'_':99}

        to_bgr_color = {
            'b': (217,56,56),
            'w': (255, 255, 255),
            'r': (0, 0, 255),
            'y': (0, 255, 255),
            'o': (0, 128, 255),
            'g': (74,200,32),
            '_': (128, 128, 128)
        }
        to_bgr_light_color = {
            'b': (255, 128, 128),
            'w': (200, 200, 200),
            'r': (128, 128, 255),
            'y': (180, 255, 255),
            'o': (130, 211, 255),
            'g': (128, 255, 128),
            '_': (128, 128, 128)
        }

    def __init__(self):
        # Which cube color we are on.
        self.index = 2
        # Count of frames read.
        self.total_readings = 0
        # The list ortho has type: ((x,y),'fullcolor_name')
        self.ortho = []
        # The list raw_points has type : (x,y)
        self.raw_points = []
        # Map of cube faces.
        self.map = [[['_' for col in range(3)]
                     for row in range(3)] for colors in range(6)]
        # Transform the color into standard notation. 'X' is an error value.
        # Values map as follows:
        # U R F D L B
        # 0 3 2 5 1 4
        self.flat_map = {
            0: 'U',
            3: 'R',
            2: 'F',
            5: 'D',
            1: 'L',
            4: 'B',
            99: 'X'
        }
        self.face_order = FACE_ORDER
        # Vote buffers belong to this scan, rather than the shared Color class.
        self.Color = self.Color()
        self.Color.freq = {}
        self.history = []
        self.status_msg = ""
        self.status_until = 0.0
        for index, color in enumerate(self.Color.from_index):
            self.map[index][1][1] = color
        self.reset_mapping()

    FACE_LABEL = {0: 'BLUE', 1: 'WHITE', 2: 'RED', 3: 'YELLOW', 4: 'ORANGE', 5: 'GREEN'}

    def clear_unlocked(self):
        """Discard provisional faces while retaining every captured face."""
        locked = set(self.history)
        for index in range(6):
            if index not in locked:
                self.map[index] = [['_' for _ in range(3)] for _ in range(3)]
                self.map[index][1][1] = self.Color.from_index[index]
        self.ortho.clear()
        self.raw_points.clear()
        self.reset_mapping()

    def undo_last(self):
        """Return to the last captured face and discard partial readings."""
        global PAUSE_AT_END
        if self.history:
            self.index = self.history.pop()
            msg = "Undid last face - re-scan " + self.FACE_LABEL[self.index]
        else:
            self.index = 2
            msg = "Re-reading RED (nothing to undo)"
        self.clear_unlocked()
        PAUSE_AT_END = False
        self.status_msg = msg
        self.status_until = time.time() + 3.0
        if SHOW_DEBUG_CONSOLE_TXT:
            print(msg)
        return msg

    def draw_hud(self, frame, tracking_enabled=None):
        label = self.FACE_LABEL.get(self.index, "DONE")
        hint = f"Show {label} face ({len(self.history)}/6 locked)   [u/r] undo"
        if DETECTION_MODE == "grid":
            tracking = TRACKING_ENABLED if tracking_enabled is None else tracking_enabled
            hint += "   [t] tracking" if tracking else "   [+/-] guide  [t] tracking"
        for thickness, color in ((3, (0, 0, 0)), (1, (255, 255, 255))):
            cv.putText(frame, hint, (10, 25), cv.FONT_HERSHEY_SIMPLEX, 0.5, color, thickness)
        if self.status_msg and time.time() < self.status_until:
            for thickness, color in ((3, (0, 0, 0)), (1, (0, 200, 255))):
                cv.putText(frame, self.status_msg, (10, 48), cv.FONT_HERSHEY_SIMPLEX,
                           0.5, color, thickness)


    def print_subcube(self, index):
        '''
        Print text. Prints as follows.
            B
        W   R   Y   O
            G

            0
        1   2   3   4
            5
        Empty parts of 3 x 4 grid are skipped.
        '''
        if (index == 0 or index == 5):
            for row in range(3):
                for col in range(2 * 3):
                    if (col < 3):
                        print(' ', end=' ')
                    else:
                        print(self.map[index][row][col % 3], end=' ')
                print()
        else:
            for row in range(3):
                for col in range(4 * 3):
                    curr_dim = col//3 + 1
                    print(self.map[curr_dim][row][col % 3], end=' ')
                print()

    def print_text_cube_map(self):
        '''
        Prints text. Used for debugging.
        Print three rows
        Top and bottom print once.
        Middle prints 4 times.
        '''
        self.print_subcube(0)
        self.print_subcube(1)
        self.print_subcube(5)

    def process(self):
        '''
        Determine which colors map where on the cube.
        Called on every frame capture read.
        '''
        global PAUSE_AT_END
        if self.index not in self.nxt or PAUSE_AT_END:
            return False
        # Sort by y value, then chunk into groups of 3.
        # Next, sort by x value for each respective group
        if (self.total_readings > MAX_TOTAL_READING_BUFFER):
            self.reset_mapping()

        if (len(self.ortho) < 9 or len(self.ortho) > 9):
            return False

        self.ortho.sort(key=lambda x: (x[0][1]))
        for row in range(0, 6+1, 3):
            self.ortho[row:row +
                       3] = sorted(self.ortho[row:row+3], key=lambda x: x[0][0])

        center_color = self.ortho[3*1 + 1][1]

        if (center_color[0] != self.Color.from_index[self.index]):
            return False

        for row in range(3):
            for col in range(3):
                current_color = self.ortho[3*row + col][1]
                self.Color.freq[current_color][row][col] += 1

                current_color_freq = self.Color.freq[current_color][row][col]

                if (current_color_freq > self.Color.max_freq[row][col]):
                    self.Color.max_freq[row][col] = current_color_freq
                    self.Color.name[row][col] = current_color
                self.map[self.index][row][col] = self.Color.name[row][col][0]

        self.total_readings += 1
        if (SHOW_DEBUG_CONSOLE_TXT):
            print(self.total_readings)
        
        if(self.mapping_frequency_success()):
            for row in range(3):
                for col in range(3):
                    self.map[self.index][row][col] = self.Color.name[row][col][0]
            if (SHOW_DEBUG_CONSOLE_TXT):
                self.print_text_cube_map()

            self.history.append(self.index)
            self.reset_mapping()
            self.index = self.nxt[self.index]

            if (self.index == -1):
                PAUSE_AT_END = True
            else:
                self.map[self.index][1][1] = self.Color.from_index[self.index]
            return True

    def mapping_frequency_success(self):
        '''
        Check if readings match frequency requirements
        '''
        if (self.total_readings < MIN_TOTAL_READING_BUFFER):
            return False
        for i in range(3):
            for j in range(3):
                if (self.Color.max_freq[i][j]/self.total_readings < MIN_COLOR_CONFIDENCE_THRESHOLD or
                        self.Color.max_freq[i][j] < MIN_COLOR_COUNT_THRESHOLD):
                    return False
                else:
                    pass
        return True

    def reset_mapping(self):
        '''
        Initialize mapping as empty.
        '''
        self.total_readings = 0

        for c in COLORS:
            self.Color.freq[c] = [[0 for i in range(3)] for j in range(3)]

        self.Color.max_freq = [[0 for i in range(3)] for j in range(3)]
        self.Color.name = [['X' for i in range(3)] for j in range(3)]

    def draw_stickers(self, frame, index, x, y,preview=False):
        bottom_right = (x + 3 * (STICKER_SUPER_LENGTH) + 2,
                        y + 3 * (STICKER_SUPER_LENGTH) + 2)

        cv.rectangle(frame, (x-STICKER_GAP, y-STICKER_GAP),
                     bottom_right, (0, 0, 0), -1)

        for i in range(3):
            for j in range(3):
                cx = x + j * (STICKER_SUPER_LENGTH) + j
                cy = y + i * (STICKER_SUPER_LENGTH) + i
                if (not preview):
                    color = self.Color.to_bgr_color[self.map[index][i][j]]
                else:
                    if (index == self.index):
                        color = self.Color.to_bgr_light_color[self.map[index][i][j]]
                    else:
                        color = self.Color.to_bgr_color[self.map[index][i][j]]
                cv.rectangle(frame, (cx, cy), (cx+STICKER_LENGTH, cy+STICKER_LENGTH),
                             color, -1)

    def draw_supercube(self, frame, pos, preview=False):
        '''
        Draws as follows.
        - Top and bottom drawn once.
        - Middle drawn 4 times.
            B
        W   R   Y   O
            G

            0
        1   2   3   4
            5
        Empty parts of 3 x 4 grid are skipped.
        '''
        if (LOW_RES_CAMERA):
            (cx, cy) = (330, 50)
        else:
            (cx,cy) = pos
        self.draw_stickers(frame, 0, cx+CUBE_LENGTH, cy,preview)
        for i in range(4):
            self.draw_stickers(frame, i+1, cx + i *
                               CUBE_LENGTH, cy+CUBE_LENGTH,preview)
        self.draw_stickers(frame, 5, cx+CUBE_LENGTH, cy+2*CUBE_LENGTH,preview)

    def color_to_notation(self, color):
        '''
        Convert the color string into its index.
        Convert the index into standard notation.
        '''
        return self.flat_map[self.Color.to_index[color]]

    def flatten_cube(self):
        '''
        Flatten the cube map into a single string.

        Go through each face and convert colors to standard notation.
        '''
        ret = ""
        for face in self.flat_map.keys():
            if (face == 99):
                continue
            for i in range(3):
                for j in range(3):
                    ret += self.color_to_notation(self.map[face][i][j])
        return ret

    def raw_faces_by_notation(self):
        '''
        Return raw detected colors keyed by standard face notation.

        Values are still the camera-detected color initials. The v4 JSON layer
        uses each face center to map these colors back into U/R/F/D/L/B.
        '''
        raw_faces = {}
        for face_index, notation in self.flat_map.items():
            if face_index == 99:
                continue
            raw_faces[notation] = [
                self.map[face_index][row][col]
                for row in range(3)
                for col in range(3)
            ]
        return raw_faces

    def reverse_notation(self,org_notation):
        raw_notations_reversed = list(reversed(org_notation.split()))
        inverse_notation_list = list()
        for move in raw_notations_reversed:
            if (len(move) == 1):
                inverse_notation_list.append(move + "'")
            elif (len(move) == 2):
                if (move[1] == "2"):
                    inverse_notation_list.append(move)
                else:
                    inverse_notation_list.append(move[0])
            else:
                raise(Exception)
        return ' '.join(inverse_notation_list)      

    def special_draw_text(self,frame, text,cx,thickness,scale,length_buffer):
        '''
        Put text of solution. Auto break line if exceeding box length.
        Slightly tab second line.

        Splits solution string into list, and processes each move unit.
        '''
        tmp = text.split(' ')
        raw_partition = ""
        current_length = 0
        y = cx[1]
        for x in tmp:
            if (current_length >= length_buffer):
                cv.putText(frame, raw_partition , (cx[0] + (13 if y != cx[1]else 0),y),
                    cv.FONT_HERSHEY_SIMPLEX, thickness, (0,0,0), scale)
                raw_partition = ""
                current_length = 0
                y += int(40 * thickness)
            raw_partition +=  " " + x
            current_length+= len(x) + 1
        if (current_length != 0):
            cv.putText(frame, raw_partition , (cx[0] + (13 if y != cx[1]else 0),y),
                cv.FONT_HERSHEY_SIMPLEX, thickness, (0,0,0), scale)
            raw_partition = ""

class Camera:
    def __init__(self, java_options=None) -> None:
        self.cube_angles = []
        self.center_cube = (0, 0)
        self.rotated_frame = None
        self.cap = cv.VideoCapture(0, cv.CAP_DSHOW)
        if hasattr(self.cap, "set"):
            self.cap.set(cv.CAP_PROP_BUFFERSIZE, 1)
        self.cube_map = CubeMap()
        self.java_options = java_options or {}
        self.report_session = None
        self.report_job = None
        self.guide_fraction = GUIDE_FRACTION
        self.grid_quad = None
        self.tracking_enabled = DETECTION_MODE == "grid" and TRACKING_ENABLED
        self.tracking_status = "searching"
        self.tracker = FaceTracker(GRID_DETECTOR, GRID_CONFIG) if GRID_DETECTOR else None
        self._closed = False

    def reset_tracking(self):
        if self.tracker is not None:
            self.tracker.reset()
        self.tracking_status = "searching"
        self.grid_quad = None

    def set_tracking(self, enabled):
        self.tracking_enabled = bool(enabled) and DETECTION_MODE == "grid"
        self.reset_tracking()
        self.cube_map.clear_unlocked()

    def cancel_solve(self):
        try:
            if self.report_job is not None:
                self.report_job.close()
                self.report_job = None
        finally:
            if self.report_session is not None:
                self.report_session.close()
                self.report_session = None

    def close(self):
        if self._closed:
            return
        self._closed = True
        try:
            self.cancel_solve()
        finally:
            if not getattr(self, "_capture_released", False):
                self.cap.release()
            cv.destroyAllWindows()

    def finish_scan(self):
        """Begin Kociemba validation without blocking camera frame updates."""
        self.cancel_solve()
        self.report_job = ReportJob("camera", self.cube_map.raw_faces_by_notation())

    def guide_quad(self, frame):
        height, width = frame.shape[:2]
        side = int(self.guide_fraction * min(width, height))
        x0, y0 = (width - side) // 2, (height - side) // 2
        return np.array([[x0, y0], [x0 + side, y0],
                         [x0 + side, y0 + side], [x0, y0 + side]], np.float32)

    def adjust_guide(self, delta):
        if self.tracking_enabled:
            return self.guide_fraction
        fraction = min(0.95, max(0.20, self.guide_fraction + delta))
        if fraction != self.guide_fraction:
            self.guide_fraction = fraction
            self.cube_map.clear_unlocked()
        return self.guide_fraction

    def _process_grid(self, frame):
        # The same sampling quad is drawn in both desktop and legacy previews.
        hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
        cells, quad = None, None
        if self.tracking_enabled:
            if self.tracker is None:
                self.tracker = FaceTracker(GRID_DETECTOR, GRID_CONFIG)
            expected = self.cube_map.FACE_LABEL.get(self.cube_map.index)
            cells, quad, self.tracking_status = self.tracker.update(
                frame, expected.lower() if expected else None)
            if self.tracker.reset_votes:
                self.cube_map.clear_unlocked()
            message = {"searching": "Looking for cube face - keep all 9 stickers visible",
                       "unstable": "Face found - steady briefly for a clear reading",
                       "tracking": "Tracking cube face"}[self.tracking_status]
            for thickness, color in ((3, (0, 0, 0)), (1, (255, 255, 255))):
                cv.putText(frame, message, (10, frame.shape[0]-18),
                           cv.FONT_HERSHEY_SIMPLEX, 0.52, color, thickness)
        elif AUTO_LOCATE:
            cells, quad = GRID_DETECTOR.detect(frame, hsv)
        if cells is None and not self.tracking_enabled:
            quad = self.guide_quad(frame)
            x0, y0 = quad[0]
            x1, y1 = quad[2]
            cells = GRID_DETECTOR.read_box(hsv, int(x0), int(y0), int(x1), int(y1))
        self.grid_quad = None if quad is None else quad.copy()
        if quad is None:
            return
        box_color = (0, 255, 0) if cells else (0, 0, 255)
        cv.polylines(frame, [quad.astype(np.int32)], True, box_color, 2)
        transform = cv.getPerspectiveTransform(
            np.array([[0, 0], [300, 0], [300, 300], [0, 300]], np.float32), quad)

        def project(points):
            return cv.perspectiveTransform(np.asarray(points, np.float32).reshape(1, -1, 2),
                                          transform).reshape(-1, 2)

        for k in (1, 2):
            a, b = project([(k*100, 0), (k*100, 300)])
            cv.line(frame, tuple(int(v) for v in a), tuple(int(v) for v in b), box_color, 1)
            a, b = project([(0, k*100), (300, k*100)])
            cv.line(frame, tuple(int(v) for v in a), tuple(int(v) for v in b), box_color, 1)
        if cells:
            self.cube_map.ortho.extend(cells)
            for i, (_, name) in enumerate(cells):
                row, col = divmod(i, 3)
                point = project([((col+0.5)*100, (row+0.5)*100)])[0]
                position = int(point[0]) - 6, int(point[1]) + 6
                cv.putText(frame, name[0].upper(), position,
                           cv.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 3)
                cv.putText(frame, name[0].upper(), position,
                           cv.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)

    def contour_bypass(self, w, h, contour_bypass_ratio) -> bool:
        '''
        Checks if contour shape is square-like
        '''
        return (w > contour_bypass_ratio * h
                or h > contour_bypass_ratio * w
                or max(w, h) > MAX_CONTOUR_SQUARE_EDGE_THRESHOLD)
    
    def find_center_cube(self, frame):
        '''
        Return the coordinates of the center cube. (If not circle center).

        Method:
        - Take the average of all points (X)
        - Find the point (A) which is closest to such average (X)
        - "Close" has a strict error bound. The average (X) should be near exact to the point (A)


        Return false if invalid.
        '''
        avg_point_x = sum(x for x, _ in self.cube_map.raw_points) / 9
        avg_point_y = sum(y for _, y in self.cube_map.raw_points) /9
        avg_point = (avg_point_x, avg_point_y)

        (best_point, best_delta) = (self.cube_map.raw_points[0], dist(avg_point,self.cube_map.raw_points[0]))
        (far_point, far_delta) = (best_point, best_delta)

        for pt in self.cube_map.raw_points:
            curr_dist = dist(avg_point,pt)
            if (curr_dist < best_delta):
                best_delta = curr_dist
                best_point = pt
            if (curr_dist > far_delta):
                far_delta = curr_dist
                far_point = pt

        if (SHOW_DEBUG_CONSOLE_TXT):
            pass
        # far_delta is diagonal length.
        # 1.0/3.0 considers the diagonal of one cubie/square on the cube.
        if (best_delta < far_delta * 1.0/3.0 * CENTER_EPSILON):
            return best_point
        else:
            return False   

    def create_rotated_frame(self, frame):
        '''
        Make detected cube orthogonal (rotates frame). Returns true if successful.
        '''
        rotate_angle = 0
        self.cube_angles.sort
        mean_angle = sum(self.cube_angles)
        median_angle = 0

        
        if (HAS_CIRCLE_CENTER):
            # Get the median and average of all the angles.
            if (len(self.cube_angles) == 8):
                mean_angle /= len(self.cube_angles)
                median_angle = self.cube_angles[len(self.cube_angles) // 2]
                if (median_angle != 0 and abs(mean_angle - median_angle) / median_angle < 0.08):
                    # The average angle is more accurate than the median in this case.
                    rotate_angle = mean_angle
                else:
                    rotate_angle = median_angle
            else:
                return False
        else:
            # Proceed exactly as in above.
            if (len(self.cube_angles) == 9):
                mean_angle /= len(self.cube_angles)
                median_angle = self.cube_angles[len(self.cube_angles) // 2]
                if (median_angle != 0 and abs(mean_angle - median_angle) / median_angle < 0.08):
                    # The average angle is more accurate than the median in this case.
                    rotate_angle = mean_angle
                else:
                    rotate_angle = median_angle
                # Find the center first.
                flag = self.find_center_cube(frame)

                if (type(flag) is bool):
                    return False
                else:
                    self.center_cube = flag
            else:
                return False
        # Prevent inaccuracies when the cube angle is uncertain
        # (Informally, this means that if the angle is very close to 45, then return false)
        if (abs(rotate_angle - 45) < ANGLE_EPSILON):
            print("Please rotate cube")
            return False
        else:
            if (rotate_angle > 45):
                rotate_angle -= 90
            height, width = frame.shape[:2]
            r_matrix = cv.getRotationMatrix2D(
                center=self.center_cube, angle=rotate_angle, scale=1)
            self.rotated_frame = cv.warpAffine(
                src=frame, M=r_matrix, dsize=(width, height))
            return True

    def create_contour_preview(self, frame, window_name, mask):
        '''
        Create weak contour preview based on mask
        '''
        preview_frame = cv.bitwise_and(frame, frame, mask=mask)
        cv.imshow(window_name, preview_frame)

    def draw_cube_contour(self, frame, color, mask, is_rotated=False):
        '''
        Draw contours with rotated rectangles and circles.

        Displays detected colors in text (if `SHOW_CONTOUR_COLOR_TEXT`)

        ### Circle Detection

        Detect center circle (instead of perceived square)

        - If the bounding circle is "larger" than the square
            - then this is a square. ([ ])

        - Else this is a circle
            - (the smaller circle is enclosed in the square). [ 0 ]

        *for circle center sytle rubik's cubes*
        '''
        contours, hierarchy = cv.findContours(
            mask, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        if (len(contours) >= 1):
            text_color = (255, 255, 255)
            if (color == "yellow" or color == "white"):
                text_color = (0, 0, 0)
            for c in contours:
                if (cv.contourArea(c) > MIN_CONTOUR_THRESHOLD):
                    x, y, w, h = cv.boundingRect(c)

                    # Bypass false detection (short ciruit)
                    if (self.contour_bypass(w, h, LENIENT_SQUARE_CONTOUR_BYPASS_RATIO)):
                        continue
                    
                    # Generate rotated rectangle
                    rect = cv.minAreaRect(c)
                    w2, h2 = rect[1]
                    rot_area = w2 * h2
                    box = cv.boxPoints(rect).astype(np.intp)

                    # Bypass false detection (strict)
                    if (self.contour_bypass(w2, h2, STRICT_SQUARE_CONTOUR_BYPASS_RATIO)):
                        continue

                    angle = (rect[2])
                    
                    # Draw minimum enclosing circle
                    (cx, cy), radius = cv.minEnclosingCircle(c)
                    center = (int(cx), int(cy))
                    circ_area = pi * radius * radius
                    radius = int(radius)

                    is_circle_center = (
                        circ_area <= CIRCLE_CONTOUR_BYPASS_SCALE * rot_area)
                    if (not is_circle_center or is_rotated):
                        pass
                    else:
                        if (HAS_CIRCLE_CENTER):
                            cv.circle(frame, center, radius, (0, 0, 255), 2)
                        # Optionally draw rough bounding rectangle for entire cube.
                        if (SHOW_ENTIRE_BOUNDING_RECTANGLE):
                            w *= 1.3
                            h *= 1.3
                            w = int(w)
                            h = int(h)
                            cv.rectangle(frame, (x - w, y - h),
                                         (x + 2 * w, y + 2 * h), (255, 0, 0), 2)
                    if is_rotated:
                        self.cube_map.ortho.append(((x, y), color))
                    else:
                        if (not HAS_CIRCLE_CENTER):
                            self.cube_map.raw_points.append((x,y))

                        if (not is_circle_center):
                            self.cube_angles.append(angle)
                        else:
                            # All cubies are square, so include this in the calculation.
                            if (not HAS_CIRCLE_CENTER):
                                self.cube_angles.append(angle)
                            else:
                                self.center_cube = center

                    # Display text on the cube stating the current identified color 
                    if (SHOW_CONTOUR_COLOR_TEXT):
                        cv.putText(frame, color, (x + 7, y + h // 2),
                                   cv.FONT_HERSHEY_SIMPLEX, 0.5, text_color, 1)

                    # Contour approximation based on the Douglas - Peucker algorithm.
                    # Informally, the over-simplification is: Turn a curve into a similar one with less points.
                    epsilon = 0.1 * cv.arcLength(c, True)
                    approx = cv.approxPolyDP(c, epsilon, True)
                    cv.drawContours(frame, approx, -1, (0, 255, 0), 5)

    def process_frame(self, frame, accumulate=True):
        """Detect and draw a preview; vote only while scanning is active."""
        self.cube_angles.clear()
        self.cube_map.ortho.clear()
        self.cube_map.raw_points.clear()
        if DETECTION_MODE == "grid":
            self._process_grid(frame)
        else:
            self.grid_quad = None
            self._process_contours(frame)
        if accumulate and not PAUSE_AT_END and self.cube_map.index != -1:
            self.cube_map.process()
        return frame

    def _process_contours(self, frame):
        original_frame = copy.copy(frame)

        # Main color recognition.
        # Convert from BGR to HSV color space.
        hsv_frame = cv.cvtColor(frame, cv.COLOR_BGR2HSV)

        # Generate masks.
        masks = dict(
            (c, cv.inRange(hsv_frame, HSV_BOUND[c][0], HSV_BOUND[c][1])) for c in COLORS)
        masks['red'] |= cv.inRange(hsv_frame, *HSV_RED_UNION_BOUND)
        # Draw contours
        for c in COLORS:
            self.draw_cube_contour(frame, c, masks[c])
            if SHOW_MASK_PREVIEW and not SHOW_ROTATED_MASK_PREVIEW:
                if (SHOW_RAW_CONTOUR_PREVIEW):
                    self.create_contour_preview(frame, c, masks[c])
                else:
                    self.create_contour_preview(original_frame, c, masks[c])

        # Handle rotated recognition.
        # NOTE:
        # This code is nearly identical to the above.
        # However, to avoid ambiguity, verbosity was favoured.
        if (self.create_rotated_frame(original_frame)):
            # Convert from BGR to HSV color space (for the rotated frame).
            hsv_rotated_frame = cv.cvtColor(
                self.rotated_frame, cv.COLOR_BGR2HSV)

            # Generate masks (for the rotated frame).
            rotated_masks = dict((c, cv.inRange(
                hsv_rotated_frame, HSV_BOUND[c][0], HSV_BOUND[c][1])) for c in COLORS)
            rotated_masks['red'] |= cv.inRange(
                hsv_rotated_frame, *HSV_RED_UNION_BOUND)

            if SHOW_ROTATED_MASK_PREVIEW:
                original_rotated_frame = copy.copy(self.rotated_frame)

            for c in COLORS:
                self.draw_cube_contour(
                    self.rotated_frame, c, rotated_masks[c], True)
                if SHOW_ROTATED_MASK_PREVIEW:
                    if (SHOW_RAW_CONTOUR_PREVIEW):
                        self.create_contour_preview(
                            original_rotated_frame, c, rotated_masks[c])
                    else:
                        self.create_contour_preview(
                            self.rotated_frame, c, rotated_masks[c])
            if (SHOW_ROTATED_FRAME_PREVIEW):
                cv.imshow('Rotated image', self.rotated_frame)
        else:
            pass


    def _toggle_center_config(self):
        with open(CONFIG_PATH, encoding="utf-8") as source:
            data = json.load(source)
        flag = data['hasCircleCenter']
        if isinstance(flag, str):
            flag = json.loads(flag)
        data['hasCircleCenter'] = "false" if flag else "true"
        with open(CONFIG_PATH, "w", encoding="utf-8") as destination:
            json.dump(data, destination, indent=4)

    def run_main_process(self):
        """Legacy OpenCV UI with live guides and cancellable solver workers."""
        global PAUSE_AT_END
        finished = False
        solve_moves = ""
        reverse_moves = ""
        while True:
            ret, frame = self.cap.read()
            if not ret or frame is None:
                raise RuntimeError("Could not read the webcam. Check camera access and connection.")
            if not LOW_RES_CAMERA:
                frame = cv.resize(frame, (800, 600))
            self.process_frame(frame, accumulate=not PAUSE_AT_END)
            self.cube_map.draw_supercube(frame, (10, 70), True)
            self.cube_map.draw_hud(frame, self.tracking_enabled)
            if PAUSE_AT_END and not finished:
                finished = True
                solve_moves = "Checking cube..."
                self.finish_scan()
                try:
                    cv.destroyWindow("Rotated image")
                except cv.error:
                    pass
            if self.report_job is not None:
                result = self.report_job.poll()
                if result is not None:
                    self.report_job.close()
                    self.report_job = None
                    kind, payload = result
                    if kind == "report":
                        self.report_session = ReportSession(
                            payload, OUTPUT_PATH, **self.java_options).start()
                        if payload["valid"] and payload["notation"] is not None:
                            solve_moves = payload["notation"]
                            reverse_moves = self.cube_map.reverse_notation(solve_moves)
                        else:
                            solve_moves = "Invalid scan. Press U to undo a face, Q to restart."
                    else:
                        solve_moves = "Cube check failed: " + str(payload)
            if self.report_session is not None:
                self.report_session.poll()
            if PAUSE_AT_END:
                java_result = (self.report_session.report["java_solver"]
                               if self.report_session is not None else solver_result("not_run"))
                frame = draw_solution_panel(frame, solve_moves, reverse_moves, java_result)
            cv.imshow(MAIN_FRAME_NAME, frame)
            key = cv.waitKey(1)
            if key in (ord('u'), ord('r')):
                self.cancel_solve()
                self.cube_map.undo_last()
                self.reset_tracking()
                finished = False
                solve_moves = reverse_moves = ""
            elif key in (ord('+'), ord('=')) and DETECTION_MODE == "grid":
                self.adjust_guide(0.03)
            elif key in (ord('-'), ord('_')) and DETECTION_MODE == "grid":
                self.adjust_guide(-0.03)
            elif key == ord('t') and DETECTION_MODE == "grid":
                self.cancel_solve()
                self.set_tracking(not self.tracking_enabled)
                finished = False
                solve_moves = reverse_moves = ""
            elif key == ord('q'):
                self.cancel_solve()
                PAUSE_AT_END = False
                return
            elif key == ord('x'):
                self.cancel_solve()
                raise SystemExit
            elif key == ord('c') and DETECTION_MODE == "contour":
                self.cancel_solve()
                self._toggle_center_config()
                PAUSE_AT_END = False
                return

def load_runtime_config(config_path, processing_backend=None):
    global HAS_CIRCLE_CENTER, COLORS, HSV_BOUND, HSV_RED_UNION_BOUND
    global MIN_CONTOUR_THRESHOLD, MAX_CONTOUR_SQUARE_EDGE_THRESHOLD
    global LENIENT_SQUARE_CONTOUR_BYPASS_RATIO, STRICT_SQUARE_CONTOUR_BYPASS_RATIO
    global CIRCLE_CONTOUR_BYPASS_SCALE, ANGLE_EPSILON, CENTER_EPSILON
    global MIN_TOTAL_READING_BUFFER, MAX_TOTAL_READING_BUFFER
    global MIN_COLOR_CONFIDENCE_THRESHOLD, MIN_COLOR_COUNT_THRESHOLD
    global LOW_RES_CAMERA
    global DETECTION_MODE, GRID_DETECTOR, GUIDE_FRACTION, AUTO_LOCATE, TRACKING_ENABLED, GRID_CONFIG
    global COLOR_MODEL, COLOR_PROFILE_ERROR

    with open(config_path, encoding="utf-8") as f:
        data = json.load(f)

    if processing_backend is not None:
        data["processing_backend"] = processing_backend

    flag = data['hasCircleCenter']
    HAS_CIRCLE_CENTER = json.loads(flag) if isinstance(flag, str) else bool(flag)
    DETECTION_MODE = data.get('detection_mode', 'grid')
    if DETECTION_MODE not in ('grid', 'contour'):
        raise ValueError("detection_mode must be 'grid' or 'contour'")
    GRID_DETECTOR = GridDetector(data)
    COLOR_PROFILE_ERROR = ""
    try:
        COLOR_MODEL = ColorModel.load(COLOR_PROFILE_PATH, data) or ColorModel(data)
    except (OSError, ValueError) as exc:
        COLOR_MODEL = ColorModel(data)
        COLOR_PROFILE_ERROR = str(exc)
    GRID_DETECTOR.color_model = COLOR_MODEL
    GRID_CONFIG = data
    TRACKING_ENABLED = data.get('grid', {}).get('tracking', True)
    if not isinstance(TRACKING_ENABLED, bool):
        raise ValueError("grid.tracking must be a boolean")
    GUIDE_FRACTION = float(data.get('grid', {}).get('guide_fraction', 0.55))
    if not np.isfinite(GUIDE_FRACTION) or not 0.20 <= GUIDE_FRACTION <= 0.95:
        raise ValueError("grid.guide_fraction must be between 0.20 and 0.95")
    AUTO_LOCATE = data.get('grid', {}).get('auto_locate', False)
    if not isinstance(AUTO_LOCATE, bool):
        raise ValueError("grid.auto_locate must be a boolean")
    COLORS = ['yellow', 'green', 'blue', 'red', 'white', 'orange']
    HSV_BOUND = dict()

    for c in COLORS:
        HSV_BOUND[c] = (np.array(data['colors'][c]['lower_bound']),
                        np.array(data['colors'][c]['upper_bound']))

    HSV_RED_UNION_BOUND = (
        np.array(data['colors']['red']['lower_bound2']),
        np.array(data['colors']['red']['upper_bound2']))

    contours = data.get("contours", {})
    MIN_CONTOUR_THRESHOLD = contours.get("min_area", MIN_CONTOUR_THRESHOLD)
    MAX_CONTOUR_SQUARE_EDGE_THRESHOLD = contours.get(
        "max_square_edge", MAX_CONTOUR_SQUARE_EDGE_THRESHOLD)
    LENIENT_SQUARE_CONTOUR_BYPASS_RATIO = contours.get(
        "lenient_square_ratio", LENIENT_SQUARE_CONTOUR_BYPASS_RATIO)
    STRICT_SQUARE_CONTOUR_BYPASS_RATIO = contours.get(
        "strict_square_ratio", STRICT_SQUARE_CONTOUR_BYPASS_RATIO)
    CIRCLE_CONTOUR_BYPASS_SCALE = contours.get(
        "circle_bypass_scale", CIRCLE_CONTOUR_BYPASS_SCALE)
    ANGLE_EPSILON = contours.get("angle_epsilon", ANGLE_EPSILON)
    CENTER_EPSILON = contours.get("center_epsilon", CENTER_EPSILON)

    scan = data.get("scan", {})
    MIN_TOTAL_READING_BUFFER = scan.get(
        "min_total_reading_buffer", MIN_TOTAL_READING_BUFFER)
    MAX_TOTAL_READING_BUFFER = scan.get(
        "max_total_reading_buffer", MAX_TOTAL_READING_BUFFER)
    MIN_COLOR_CONFIDENCE_THRESHOLD = scan.get(
        "min_color_confidence_threshold", MIN_COLOR_CONFIDENCE_THRESHOLD)
    MIN_COLOR_COUNT_THRESHOLD = scan.get(
        "min_color_count_threshold", MIN_COLOR_COUNT_THRESHOLD)

    camera = data.get("camera", {})
    LOW_RES_CAMERA = camera.get("low_res_camera", LOW_RES_CAMERA)

    for c in COLORS:
        CubeMap.Color.freq[c] = [[0 for i in range(3)] for j in range(3)]


def parse_args():
    parser = argparse.ArgumentParser(description="Scan a Rubik's Cube and write v4 JSON output.")
    parser.add_argument("--config", default=CONFIG_PATH, help="Path to scanner configuration JSON.")
    parser.add_argument("--output", default="cube_state.json", help="Path for the final cube JSON report.")
    parser.add_argument("--debug", action="store_true", help="Enable console debug output.")
    return parser.parse_args()


def main(args=None):
    global CONFIG_PATH, OUTPUT_PATH, MAIN_FRAME_NAME, SHOW_DEBUG_CONSOLE_TXT

    args = args or parse_args()
    CONFIG_PATH = args.config
    OUTPUT_PATH = args.output
    if args.debug:
        SHOW_DEBUG_CONSOLE_TXT = True

    if not os.path.isabs(CONFIG_PATH):
        CONFIG_PATH = os.path.abspath(CONFIG_PATH)
    if not os.path.isabs(OUTPUT_PATH):
        OUTPUT_PATH = os.path.abspath(OUTPUT_PATH)

    while True:
        global PAUSE_AT_END
        PAUSE_AT_END = False
        load_runtime_config(CONFIG_PATH, getattr(args, "vision_backend", None))
        cam = Camera({"timeout": getattr(args, "java_timeout", 30.0),
                      "heap_mb": getattr(args, "java_heap_mb", 512),
                      "java": getattr(args, "java", "java")})

        if DETECTION_MODE == "grid":
            MAIN_FRAME_NAME = "Rubik's Cube Reader (GRID)"
        elif HAS_CIRCLE_CENTER:
            MAIN_FRAME_NAME = "Rubik's Cube Reader (CIRCLE)"
        else:
            MAIN_FRAME_NAME = "Rubik's Cube Reader (SQUARE)"

        try:
            cam.run_main_process()
        finally:
            cam.close()


if __name__ == "__main__":
    main()
