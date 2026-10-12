package cli;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.StringJoiner;
import move.CubeMover;
import solver.BidirectionalBFSSolver;
import solver.Solution;
import state.Cubie;
import state.Facelet;

/** One cube in, one response out. Search implementations remain independent. */
public final class PipeMain {
    public static final String VERSION = "RUBIKS_PIPE_V1";

    public static void main(String[] args) {
        long started = System.nanoTime();
        try {
            BufferedReader input = new BufferedReader(
                    new InputStreamReader(System.in, StandardCharsets.UTF_8));
            String state = input.readLine();
            Facelet facelets;
            try {
                facelets = new Facelet(state);
            } catch (IllegalArgumentException ex) {
                respond("INVALID_INPUT", "", 0, 0, started, "invalid_input", ex.getMessage());
                return;
            }
            Cubie cube;
            try {
                cube = facelets.toCubie();
            } catch (IllegalStateException ex) {
                respond("INVALID_CUBE", "", 0, 0, started, "invalid_cube", ex.getMessage());
                return;
            }
            Solution solution = cube.isSolved()
                    ? new Solution(new ArrayList<>(), 0, 0)
                    : new BidirectionalBFSSolver().solve(cube);
            CubeMover mover = new CubeMover();
            Cubie replay = cube.copy();
            StringJoiner notation = new StringJoiner(" ");
            for (int move : solution.moves) {
                if (move < 0 || move > 17) {
                    respond("INVALID_SOLUTION", "", solution.searchedMoves, solution.visitedMoves,
                            started, "invalid_solution", "Solver returned an invalid move ID");
                    return;
                }
                replay = mover.moveEncoded(replay, move);
                notation.add(CubeMover.stringifyMove(move));
            }
            if (!replay.isSolved()) {
                respond("INVALID_SOLUTION", "", solution.searchedMoves, solution.visitedMoves,
                        started, "invalid_solution", "Returned moves did not solve the input cube");
                return;
            }
            respond("SOLVED", notation.toString(), solution.searchedMoves, solution.visitedMoves,
                    started, "", "");
        } catch (Exception ex) {
            ex.printStackTrace(System.err);
            respond("FAILED", "", 0, 0, started, "solver_failed", ex.toString());
        }
        // OutOfMemoryError is deliberately a nonzero process exit, handled by Python.
    }

    private static String clean(String value) {
        return value.replace('\t', ' ').replace('\r', ' ').replace('\n', ' ');
    }

    private static void respond(String status, String notation, int searched, int visited,
                                long started, String code, String detail) {
        long elapsed = (System.nanoTime() - started) / 1_000_000;
        System.out.println(String.join("\t", VERSION, status, notation,
                Integer.toString(searched), Integer.toString(visited), Long.toString(elapsed),
                code, clean(detail)));
        System.out.flush();
    }
}
