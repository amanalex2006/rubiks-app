"""Build the small Windows WebView2 child host; download SDK only during setup."""
import hashlib
import json
import os
from pathlib import Path
import subprocess
import urllib.request
import zipfile

APP_ROOT = Path(__file__).resolve().parents[1]
SOURCE = APP_ROOT / "viewer" / "native" / "WebViewHost.cs"
OUTPUT = SOURCE.parent / "bin"
EXE = OUTPUT / "CubeStudioWebView.exe"
SDK_VERSION = "1.0.4258.31"
SDK_SHA256 = "56f7f4b8bf9aee4b8efefbbdd4f67d5f74ebd1b100ed0806da71bf76af481aa9"
SDK_URL = f"https://api.nuget.org/v3-flatcontainer/microsoft.web.webview2/{SDK_VERSION}/microsoft.web.webview2.{SDK_VERSION}.nupkg"
SDK_FILES = {
    "lib/net462/Microsoft.Web.WebView2.Core.dll": "Microsoft.Web.WebView2.Core.dll",
    "lib/net462/Microsoft.Web.WebView2.WinForms.dll": "Microsoft.Web.WebView2.WinForms.dll",
    "runtimes/win-x64/native/WebView2Loader.dll": "WebView2Loader.dll",
}


def build():
    if os.name != "nt":
        raise RuntimeError("The embedded viewer currently targets Windows")
    compiler = Path(os.environ.get("WINDIR", "C:/Windows")) / "Microsoft.NET/Framework64/v4.0.30319/csc.exe"
    if not compiler.is_file():
        raise RuntimeError("The Windows .NET Framework compiler is unavailable")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    archive = OUTPUT / f"webview2-{SDK_VERSION}.nupkg"
    if not all((OUTPUT / name).is_file() for name in SDK_FILES.values()):
        if not archive.exists():
            with urllib.request.urlopen(SDK_URL, timeout=60) as response:
                archive.write_bytes(response.read())
        if hashlib.sha256(archive.read_bytes()).hexdigest() != SDK_SHA256:
            raise RuntimeError("The downloaded WebView2 SDK does not match its pinned hash")
        with zipfile.ZipFile(archive) as package:
            for source, target in SDK_FILES.items():
                (OUTPUT / target).write_bytes(package.read(source))
            license_path = next((name for name in package.namelist() if name.lower() in
                                 ("license.txt", "license.md", "license")), None)
            if license_path:
                (OUTPUT / "Microsoft-WebView2-LICENSE.txt").write_bytes(package.read(license_path))
    subprocess.run([str(compiler), "/nologo", "/target:exe", "/platform:x64", "/optimize+",
                    f"/out:{EXE}", "/reference:System.dll", "/reference:System.Drawing.dll",
                    "/reference:System.Windows.Forms.dll", "/reference:System.Web.Extensions.dll",
                    f"/reference:{OUTPUT / 'Microsoft.Web.WebView2.Core.dll'}",
                    f"/reference:{OUTPUT / 'Microsoft.Web.WebView2.WinForms.dll'}", str(SOURCE)], check=True)
    files = [EXE, *(OUTPUT / name for name in SDK_FILES.values()), OUTPUT / "Microsoft-WebView2-LICENSE.txt"]
    record = {"package": "Microsoft.Web.WebView2", "version": SDK_VERSION, "url": SDK_URL,
              "sdk_sha256": SDK_SHA256,
              "source_sha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
              "files": {file.name: hashlib.sha256(file.read_bytes()).hexdigest() for file in files}}
    (OUTPUT / "UPSTREAM.json").write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    return EXE


if __name__ == "__main__":
    print(build())
