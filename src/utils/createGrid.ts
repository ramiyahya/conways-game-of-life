import { DEAD_CELL } from '../constants';

const createGrid = (rows: number, cols: number, seed = DEAD_CELL) => {
    const emptyArray = new Array(rows).fill([]);
    const grid = emptyArray.map(() => new Array(cols).fill(seed));

    return {
        grid,
        rows,
        cols
    };
};

export { createGrid };
