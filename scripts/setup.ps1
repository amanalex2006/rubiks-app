$ErrorActionPreference = 'Stop'
$appRoot = Split-Path -Parent $PSScriptRoot
$pythonPath = Join-Path $appRoot '.venv\Scripts\python.exe'
if (-not (Test-Path -LiteralPath $pythonPath)) {
    python -m venv (Join-Path $appRoot '.venv')
    if ($LASTEXITCODE -ne 0) { throw 'Could not create the Python environment.' }
}
& $pythonPath -m pip install numpy opencv-python
if ($LASTEXITCODE -ne 0) { throw 'Could not install camera dependencies.' }
& $pythonPath -c "import kociemba"
if ($LASTEXITCODE -ne 0) {
    # Windows fallback uses the original Python implementation and needs no C compiler.
    & $pythonPath (Join-Path $PSScriptRoot 'install_kociemba_python.py')
    if ($LASTEXITCODE -ne 0) { throw 'Could not install Kociemba.' }
}
& $pythonPath (Join-Path $PSScriptRoot 'build_java.py')
if ($LASTEXITCODE -ne 0) { throw 'Could not compile Java; install a JDK 17 or later.' }
$nativeFiles = @('CubeStudioWebView.exe', 'Microsoft.Web.WebView2.Core.dll',
                 'Microsoft.Web.WebView2.WinForms.dll', 'WebView2Loader.dll',
                 'Microsoft-WebView2-LICENSE.txt')
$missingNativeFiles = $nativeFiles | Where-Object {
    -not (Test-Path -LiteralPath (Join-Path $appRoot "viewer\native\bin\$_"))
}
if ($missingNativeFiles) {
    & $pythonPath (Join-Path $PSScriptRoot 'build_native_viewer.py')
    if ($LASTEXITCODE -ne 0) { throw 'Could not build the embedded 3D viewer.' }
}
Write-Output 'Setup complete. Run: .\.venv\Scripts\python.exe run.py'
