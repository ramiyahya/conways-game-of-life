import { LIVE_CELL } from '../constants';

interface Grid {
    grid: Array<[]>;
    rows: number;
    cols: number;
}

const countLiveNeighbours = (
    { grid, rows, cols }: Grid,
    x: number,
    y: number
) => {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const row = (x + i + rows) % rows;
            const col = (y + j + cols) % cols;
            const originCell = row === x && col === y;

            if (!originCell && grid[row][col] === LIVE_CELL) {
                sum += 1;
            }
        }
    }

    return sum;
};

export { countLiveNeighbours };
