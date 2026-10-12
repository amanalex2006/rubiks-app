"""Install Kociemba's unchanged Python fallback when no native compiler is available.

Repackage the official, hash-checked 1.2.1 source archive as a pure Python wheel.
The upstream package already selects its Python implementation if the C module
cannot be imported. No solver code or pruning tables are modified.
"""

import argparse
import base64
import csv
import hashlib
import io
import json
from pathlib import Path
import subprocess
import sys
import tarfile
import tempfile
import urllib.request
import zipfile


VERSION = "1.2.1"


def make_wheel(archive, destination):
    entries = {}
    with tarfile.open(archive, "r:gz") as source:
        for member in source.getmembers():
            parts = member.name.split("/")
            if not member.isfile() or len(parts) < 2 or ".." in parts:
                continue
            if parts[1] == "kociemba":
                entries["/".join(parts[1:])] = source.extractfile(member).read()
            elif parts[1] == "LICENSE":
                entries[f"kociemba-{VERSION}.dist-info/LICENSE"] = source.extractfile(member).read()
    if "kociemba/__init__.py" not in entries:
        raise RuntimeError("Archive does not contain the upstream Kociemba package")
    info = f"kociemba-{VERSION}.dist-info"
    entries[f"{info}/METADATA"] = (
        f"Metadata-Version: 2.1\nName: kociemba\nVersion: {VERSION}\n"
        "Summary: Upstream Kociemba with its bundled Python implementation\n"
        "Home-page: https://github.com/muodov/kociemba\nLicense: GPL-2.0\n"
        "Requires-Dist: future\nRequires-Dist: cffi>=1.0.0\n\n"
        "Python fallback installation; upstream source files are unchanged.\n"
    ).encode()
    entries[f"{info}/WHEEL"] = (
        "Wheel-Version: 1.0\nGenerator: rubiks-app\nRoot-Is-Purelib: true\nTag: py3-none-any\n"
    ).encode()
    entries[f"{info}/entry_points.txt"] = b"[console_scripts]\nkociemba = kociemba.command_line:main\n"
    record = io.StringIO(newline="")
    writer = csv.writer(record)
    for name, data in entries.items():
        digest = base64.urlsafe_b64encode(hashlib.sha256(data).digest()).rstrip(b"=").decode()
        writer.writerow((name, "sha256=" + digest, len(data)))
    writer.writerow((f"{info}/RECORD", "", ""))
    entries[f"{info}/RECORD"] = record.getvalue().encode()
    wheel = Path(destination) / f"kociemba-{VERSION}-py3-none-any.whl"
    with zipfile.ZipFile(wheel, "w", zipfile.ZIP_DEFLATED) as output:
        for name, data in entries.items():
            output.writestr(name, data)
    return wheel


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--archive", type=Path, help="Use an already downloaded official source archive")
    args = parser.parse_args()
    with tempfile.TemporaryDirectory(prefix="kociemba-python-") as temporary:
        archive = args.archive
        if archive is None:
            with urllib.request.urlopen(f"https://pypi.org/pypi/kociemba/{VERSION}/json", timeout=30) as response:
                metadata = json.load(response)
            release = next(item for item in metadata["urls"] if item["packagetype"] == "sdist")
            with urllib.request.urlopen(release["url"], timeout=60) as response:
                data = response.read()
            if hashlib.sha256(data).hexdigest() != release["digests"]["sha256"]:
                raise RuntimeError("Kociemba source archive checksum did not match PyPI")
            archive = Path(temporary) / "kociemba.tar.gz"
            archive.write_bytes(data)
        wheel = make_wheel(archive, temporary)
        subprocess.run([sys.executable, "-m", "pip", "install", str(wheel)], check=True)


if __name__ == "__main__":
    main()
