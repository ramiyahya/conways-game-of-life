import { LIVE_CELL, DEAD_CELL } from '../constants';

const computeNextGeneration = (
    currentState: boolean,
    liveNeighbours: number
) => {
    if (currentState === DEAD_CELL && liveNeighbours === 3) {
        return LIVE_CELL;
    } else if (
        currentState === LIVE_CELL &&
        (liveNeighbours < 2 || liveNeighbours > 3)
    ) {
        return DEAD_CELL;
    } else {
        return currentState;
    }
};

export { computeNextGeneration };
