import React from 'react';
import classNames from 'classnames';
import {
    createGrid,
    countLiveNeighbours,
    computeNextGeneration
} from './utils';

import './App.css';

const ROWS = 10;
const COLS = 10;

interface CellProps {
    alive: boolean;
    handleClick: () => void;
}

interface IGridConfig {
    rows: number;
    cols: number;
}

interface IState {
    grid: Array<Array<boolean>>;
}

interface IProps {}

const Cell = ({ alive, handleClick }: CellProps) => {
    const cls = classNames('cell', {
        'cell--alive': alive,
        'cell--dead': !alive
    });
    return <div className={cls} onClick={handleClick} />;
};

class Grid extends React.Component<IProps, IState> {
    gridConfig: IGridConfig;

    constructor(props: IProps) {
        super(props);

        const { grid, rows, cols } = createGrid(ROWS, COLS);
        this.updateCellState = this.updateCellState.bind(this);
        this.resetGrid = this.resetGrid.bind(this);
        this.nextGeneration = this.nextGeneration.bind(this);
        this.gridConfig = {
            rows,
            cols
        };

        this.state = {
            grid
        };
    }

    resetGrid() {
        const { grid } = createGrid(ROWS, COLS);
        this.setState({
            grid
        });
    }

    updateCellState(x: number, y: number) {
        const { grid } = this.state;
        let gridClone = grid.slice();
        gridClone[x][y] = !gridClone[x][y];

        this.setState({
            grid: gridClone
        });
    }

    nextGeneration() {
        const { grid } = this.state;
        const { cols, rows } = this.gridConfig;
        const { grid: nextGrid } = createGrid(ROWS, COLS);

        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                const currentState = grid[x][y];
                const liveNeighbours = countLiveNeighbours(
                    { grid, rows, cols },
                    x,
                    y
                );
                const nextGeneration = computeNextGeneration(
                    currentState,
                    liveNeighbours
                );
                nextGrid[x][y] = nextGeneration;
            }
        }

        this.setState({
            grid: nextGrid
        });
    }

    createBoard() {
        const { grid } = this.state;
        const { cols, rows } = this.gridConfig;
        const board = [];

        for (let x = 0; x < rows; x++) {
            const cells = [];

            for (let y = 0; y < cols; y++) {
                cells.push(
                    <Cell
                        key={y}
                        alive={grid[x][y]}
                        handleClick={() => this.updateCellState(x, y)}
                    />
                );
            }

            board.push(
                <div className="row" key={x}>
                    {cells}
                </div>
            );
        }
        return board;
    }

    render() {
        return (
            <div className="game-container">
                <div className="grid">{this.createBoard()}</div>
                <div className="game-controls-container">
                    <button onClick={this.resetGrid} className="game-control">
                        Reset Grid
                    </button>
                    <button
                        onClick={this.nextGeneration}
                        className="game-control"
                    >
                        Next Generation
                    </button>
                </div>
            </div>
        );
    }
}

export default Grid;
