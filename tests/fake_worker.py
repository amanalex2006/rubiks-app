"""Test child process for exercising real stdin/stdout/stderr and termination."""

from pathlib import Path
import sys
import time

mode = sys.argv[1]
state = sys.stdin.read()
Path(sys.argv[2]).write_text(state, encoding="utf-8")
if mode == "sleep":
    time.sleep(120)
elif mode == "bad":
    print("not a protocol response")
elif mode == "exit":
    sys.stderr.write("Simulated child failure\n")
    raise SystemExit(7)
else:
    if mode == "flood":
        sys.stderr.write("diagnostic " * 20000)
        sys.stderr.flush()
    print("RUBIKS_PIPE_V1\tSOLVED\t\t0\t0\t1\t\t")
