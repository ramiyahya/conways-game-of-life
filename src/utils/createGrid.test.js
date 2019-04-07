import { createGrid } from './createGrid';

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

describe('createGrid', () => {
    const { grid } = createGrid(ROWS, COLS);

    it('should create a grid with number of rows provided', () => {
        expect(grid).toHaveLength(ROWS);
    });

    it('should create a grid with number of columns provided', () => {
        expect(grid[0]).toHaveLength(COLS);
    });
});
