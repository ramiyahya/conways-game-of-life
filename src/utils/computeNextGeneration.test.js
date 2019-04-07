import { computeNextGeneration } from './computeNextGeneration';
import { LIVE_CELL, DEAD_CELL } from '../constants';

describe('A live cell', () => {
    it('with fewer than two live neighbours dies of under-population', () => {
        const result = computeNextGeneration(LIVE_CELL, 1);
        expect(result).toEqual(DEAD_CELL);
    });

    it('with 2 live neighbours lives on to the next generation', () => {
        const result = computeNextGeneration(LIVE_CELL, 2);
        expect(result).toEqual(LIVE_CELL);
    });

    it('with 3 live neighbours lives on to the next generation', () => {
        const result = computeNextGeneration(LIVE_CELL, 3);
        expect(result).toEqual(LIVE_CELL);
    });

    it('with more than 3 live neighbours dies of overcrowding', () => {
        const result = computeNextGeneration(LIVE_CELL, 4);
        expect(result).toEqual(DEAD_CELL);
    });
});

describe('A dead cell', () => {
    it('with exactly 3 live neighbours comes to life', () => {
        const result = computeNextGeneration(DEAD_CELL, 3);
        expect(result).toEqual(LIVE_CELL);
    });

    it('with more than 3 live neighbours remains dead', () => {
        const result = computeNextGeneration(DEAD_CELL, 4);
        expect(result).toEqual(DEAD_CELL);
    });
});
