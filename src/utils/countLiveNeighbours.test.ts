import { createGrid } from './createGrid';
import { countLiveNeighbours } from './countLiveNeighbours';

const ROWS = 4;
const COLS = 3;

/**
 * Visual aid for grid representation
 * 0,0 | 0,1 | 0,2
 * ----------------
 * 1,0 | 1,1 | 1,2
 * ----------------
 * 2,0 | 2,1 | 2,2
 * ----------------
 * 3,0 | 3,1 | 3,2
 */

describe('A cell', () => {
    it('with 0 live neighbours should return 0', () => {
        const { grid, ...rest } = createGrid(ROWS, COLS);
        const x = 1;
        const y = 1;

        const result = countLiveNeighbours({ grid, ...rest }, x, y);
        expect(result).toEqual(0);
    });

    it('with 2 live neighbours should return 2', () => {
        const { grid, ...rest } = createGrid(ROWS, COLS);
        const x = 1;
        const y = 1;
        grid[x][y] = true;
        grid[1][0] = true;
        grid[0][2] = true;

        const result = countLiveNeighbours({ grid, ...rest }, x, y);
        expect(result).toEqual(2);
    });

    it('with 8 live neighbours should return 8', () => {
        const { grid, ...rest } = createGrid(ROWS, COLS);
        const x = 1;
        const y = 1;
        grid[x][y] = true;
        grid[0][0] = true;
        grid[0][1] = true;
        grid[0][2] = true;
        grid[1][0] = true;
        grid[1][2] = true;
        grid[2][0] = true;
        grid[2][1] = true;
        grid[2][2] = true;

        const result = countLiveNeighbours({ grid, ...rest }, x, y);
        expect(result).toEqual(8);
    });
});

describe('A cell at the right edge of a grid', () => {
    /**
     * true  | false | false
     * ---------------------
     * true  | false | true
     * ---------------------
     * false | false | false
     * ---------------------
     * false | false | false
     */
    it('should wrap around grid and count live neighbours on the left', () => {
        const { grid, ...rest } = createGrid(ROWS, COLS);
        const x = 1;
        const y = 2;
        grid[x][y] = true;
        grid[0][0] = true;
        grid[1][0] = true;

        const result = countLiveNeighbours({ grid, ...rest }, x, y);
        expect(result).toEqual(2);
    });
});

describe('A cell at the bottom edge of a grid', () => {
    /**
     * true  | true  | true
     * ---------------------
     * false | false | false
     * ---------------------
     * false | false | false
     * ---------------------
     * false | true  | false
     */
    it('should wrap around grid and count live neighbours on the top', () => {
        const { grid, ...rest } = createGrid(ROWS, COLS);
        const x = 1;
        const y = 2;
        grid[x][y] = true;
        grid[0][0] = true;
        grid[0][1] = true;
        grid[0][2] = true;

        const result = countLiveNeighbours({ grid, ...rest }, x, y);
        expect(result).toEqual(3);
    });
});
