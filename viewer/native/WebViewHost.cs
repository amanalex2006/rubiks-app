// Small WebView2 child control hosted by Cube Studio's Tk frame.
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Web.Script.Serialization;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

internal sealed class HostPanel : Panel
{
    [StructLayout(LayoutKind.Sequential)] private struct Rect { public int Left, Top, Right, Bottom; }
    [DllImport("user32.dll")] private static extern bool GetClientRect(IntPtr hwnd, out Rect rect);
    [DllImport("user32.dll")] private static extern bool IsWindow(IntPtr hwnd);
    private readonly IntPtr parent;
    private readonly int parentPid;
    private readonly string dataFolder;
    private readonly JavaScriptSerializer json = new JavaScriptSerializer();
    private readonly object outputLock = new object();
    private readonly System.Windows.Forms.Timer timer = new System.Windows.Forms.Timer();
    private readonly WebView2 view = new WebView2();
    private Uri allowedOrigin;
    private string currentUrl;
    private bool stopping;

    protected override CreateParams CreateParams
    {
        get {
            CreateParams cp = base.CreateParams;
            cp.Parent = parent;
            cp.Style = (cp.Style | 0x40000000 | 0x10000000) & unchecked((int)~0x80000000);
            return cp;
        }
    }

    public HostPanel(IntPtr parentHandle, int ownerPid, string url, string profile, string background)
    {
        parent = parentHandle; parentPid = ownerPid; dataFolder = profile;
        SetUrl(url);
        BackColor = ColorTranslator.FromHtml(background);
        view.DefaultBackgroundColor = BackColor;
        view.Dock = DockStyle.Fill;
        Controls.Add(view);
        ResizeToParent();
        CreateControl();
        timer.Interval = 100;
        timer.Tick += delegate {
            try {
                if (!IsWindow(parent) || Process.GetProcessById(parentPid).HasExited) { Shutdown(); return; }
                ResizeToParent();
            } catch { Shutdown(); }
        };
        timer.Start();
        BeginInvoke(new Action(InitializeViewer));
        Thread reader = new Thread(ReadCommands);
        reader.IsBackground = true;
        reader.Start();
    }

    private void SetUrl(string url)
    {
        Uri uri = new Uri(url);
        if (uri.Scheme != "http" || uri.Host != "127.0.0.1") throw new ArgumentException("Only the local viewer is allowed");
        if (allowedOrigin != null && uri.GetLeftPart(UriPartial.Authority) != allowedOrigin.GetLeftPart(UriPartial.Authority))
            throw new ArgumentException("Viewer origin changed");
        allowedOrigin = uri; currentUrl = url;
    }

    private void ResizeToParent()
    {
        Rect rect;
        if (GetClientRect(parent, out rect)) SetBounds(0, 0, Math.Max(1, rect.Right), Math.Max(1, rect.Bottom));
    }

    private async void InitializeViewer()
    {
        try {
            CoreWebView2Environment environment = await CoreWebView2Environment.CreateAsync(null, dataFolder);
            await view.EnsureCoreWebView2Async(environment);
            if (stopping) return;
            view.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;
            view.CoreWebView2.Settings.AreBrowserAcceleratorKeysEnabled = false;
            view.CoreWebView2.Settings.AreDevToolsEnabled = false;
            view.CoreWebView2.Settings.IsStatusBarEnabled = false;
            view.CoreWebView2.NavigationStarting += delegate(object sender, CoreWebView2NavigationStartingEventArgs args) {
                Uri destination;
                if (!Uri.TryCreate(args.Uri, UriKind.Absolute, out destination) ||
                    destination.GetLeftPart(UriPartial.Authority) != allowedOrigin.GetLeftPart(UriPartial.Authority)) args.Cancel = true;
            };
            view.CoreWebView2.NewWindowRequested += delegate(object sender, CoreWebView2NewWindowRequestedEventArgs args) { args.Handled = true; };
            view.CoreWebView2.ProcessFailed += delegate(object sender, CoreWebView2ProcessFailedEventArgs args) {
                Send(new { type = "error", message = "The embedded renderer stopped: " + args.ProcessFailedKind });
            };
            view.CoreWebView2.NavigationCompleted += delegate(object sender, CoreWebView2NavigationCompletedEventArgs args) {
                Send(new { type = "navigation", success = args.IsSuccess, error = args.WebErrorStatus.ToString() });
            };
            view.CoreWebView2.Navigate(currentUrl);
            Send(new { type = "ready", hwnd = Handle.ToInt64(), parent_hwnd = parent.ToInt64(),
                       browser_pid = view.CoreWebView2.BrowserProcessId, width = Width, height = Height });
        } catch (Exception error) { Send(new { type = "error", message = error.Message }); }
    }

    private void Send(object message)
    {
        lock (outputLock) { Console.WriteLine(json.Serialize(message)); Console.Out.Flush(); }
    }

    private void ReadCommands()
    {
        try {
            string line;
            while ((line = Console.ReadLine()) != null && !stopping) {
                if (line.Length > 65536) continue;
                Dictionary<string, object> command = json.Deserialize<Dictionary<string, object>>(line);
                BeginInvoke(new Action(delegate { HandleCommand(command); }));
            }
        } catch (Exception error) { Console.Error.WriteLine(error.Message); }
        if (!stopping && IsHandleCreated) try { BeginInvoke(new Action(Shutdown)); } catch { }
    }

    private async void HandleCommand(Dictionary<string, object> command)
    {
        object id = command.ContainsKey("id") ? command["id"] : null;
        try {
            string action = Convert.ToString(command["action"]);
            if (action == "quit") { Shutdown(); return; }
            if (action == "navigate") {
                SetUrl(Convert.ToString(command["url"]));
                if (view.CoreWebView2 != null) view.CoreWebView2.Navigate(currentUrl);
            } else if (action == "evaluate") {
                if (view.CoreWebView2 == null) throw new InvalidOperationException("3D renderer is still opening");
                string result = await view.CoreWebView2.ExecuteScriptAsync(Convert.ToString(command["script"]));
                Send(new { type = "response", id = id, result = result });
            } else if (action == "capture") {
                if (view.CoreWebView2 == null) throw new InvalidOperationException("3D renderer is still opening");
                using (FileStream stream = File.Create(Convert.ToString(command["path"])))
                    await view.CoreWebView2.CapturePreviewAsync(CoreWebView2CapturePreviewImageFormat.Png, stream);
                Send(new { type = "response", id = id, result = "true" });
            }
        } catch (Exception error) { Send(new { type = "response", id = id, error = error.Message }); }
    }

    private void Shutdown()
    {
        if (stopping) return;
        stopping = true;
        Send(new { type = "shutdown", phase = "disposing" });
        timer.Stop(); timer.Dispose();
        view.Dispose(); Dispose();
        Send(new { type = "shutdown", phase = "disposed" });
        Application.ExitThread();
    }
}

internal static class Program
{
    [STAThread] private static int Main(string[] args)
    {
        Console.InputEncoding = new UTF8Encoding(false);
        Console.OutputEncoding = new UTF8Encoding(false);
        try {
            Dictionary<string, string> options = new Dictionary<string, string>();
            for (int i = 0; i + 1 < args.Length; i += 2) options.Add(args[i], args[i + 1]);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            HostPanel host = new HostPanel(new IntPtr(long.Parse(options["--parent"])),
                int.Parse(options["--parent-pid"]), options["--url"], options["--data-folder"], options["--background"]);
            Application.Run();
            GC.KeepAlive(host);
            return 0;
        } catch (Exception error) {
            Console.Error.WriteLine(error.ToString());
            return 1;
        }
    }
}
