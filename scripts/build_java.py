"""Build a Java 17 executable JAR without Maven, Gradle, or downloaded libraries."""

from pathlib import Path
import os
import shutil
import subprocess
import tempfile


APP_ROOT = Path(__file__).resolve().parents[1]
SOURCE = APP_ROOT / "solver-java" / "src"
BUILD = APP_ROOT / "solver-java" / "build"
JAR = BUILD / "solver.jar"


def needs_build():
    return not JAR.is_file() or any(path.stat().st_mtime > JAR.stat().st_mtime
                                  for path in SOURCE.rglob("*.java"))


def build():
    javac = shutil.which("javac")
    jar = str(Path(javac).with_name("jar.exe" if os.name == "nt" else "jar")) if javac else None
    if not javac or not Path(jar).is_file():
        raise RuntimeError("Install a JDK 17 or later and put its bin directory on PATH")
    BUILD.mkdir(parents=True, exist_ok=True)
    flags = subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
    with tempfile.TemporaryDirectory(prefix="java-build-", dir=BUILD) as temporary:
        classes = Path(temporary) / "classes"
        classes.mkdir()
        subprocess.run([javac, "--release", "17", "-encoding", "UTF-8", "-d", str(classes),
                        *map(str, sorted(SOURCE.rglob("*.java")))], check=True, creationflags=flags)
        staged_jar = Path(temporary) / "solver.jar"
        subprocess.run([jar, "--create", "--file", str(staged_jar), "--main-class", "cli.PipeMain",
                        "-C", str(classes), "."], check=True, creationflags=flags)
        staged_jar.replace(JAR)
    print(f"Built {JAR}")
    return JAR


if __name__ == "__main__":
    build()
