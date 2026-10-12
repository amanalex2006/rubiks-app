import move.CubeMover;
import state.Cubie;
import state.Facelet;

/** Test-only adapter for checking the Java model against independent fixtures. */
public class CubeModelProbe {
    public static void main(String[] args) {
        Cubie cube = new Facelet(args[0]).toCubie();
        CubeMover mover = new CubeMover();
        int[] moves = new int[args.length - 1];
        for (int i = 1; i < args.length; i++) {
            moves[i - 1] = Integer.parseInt(args[i]);
        }
        cube = mover.applyMoves(cube, moves);
        if (!cube.isValid()) {
            throw new AssertionError("Move resulted in an illegal cube");
        }
        if (!cube.getKey().equals(new Cubie(cube.getKey()).getKey())) {
            throw new AssertionError("Cube key did not round-trip");
        }
        System.out.println(new Facelet(cube));
    }
}
