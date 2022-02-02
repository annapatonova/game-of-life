import { Injectable } from '@angular/core';
import { Cell } from './cell/cell';

@Injectable({
  providedIn: 'root'
})
export class GameOfLifeService {

  private grid: Cell[][] = [];

  private rows: number = 5;

  private cols: number = 5;

  private livingCells: Array<Cell> = [];

  private _generationCount = 0;

  constructor() {}

  get generationCount(): number {
    return this._generationCount;
  }

  initGrid(rows: number, cols: number) {
    this._generationCount = 0;
    this.rows = rows;
    this.cols = cols;

    this.grid = [];
    for (var j: number = 0; j < this.rows; j++) {
      this.grid[j] = [];
      for (var i: number = 0; i < this.cols; i++) {
        this.grid[j][i] = new Cell(j, i);
      }
    }
    return this.grid;
  }

  getNextGeneration() {
    var livingGrid = this.getLivingGrid();
    var cellsToUpdate: Array<Cell> = [];

    livingGrid.forEach((cell) => {
      if (this.willDie(cell)) {
        cell.setTempState(0);
        cellsToUpdate.push(cell);
      } else if (this.willAlive(cell)) {
        cell.setTempState(1);
        cellsToUpdate.push(cell);
      }
    });

    this.updateAllCellsStatus(cellsToUpdate);
    this._generationCount++;
  }

  updateAllCellsStatus(cellsToUpdate: Array<Cell>) {
    cellsToUpdate.forEach((cell) => {
      cell.updateCurrentState();
      if (cell.isAlive()) {
        this.livingCells.push(cell);
      } else {
        this.livingCells.splice(this.livingCells.indexOf(cell), 1);
      }
    });
  }

  getLivingCells():Cell[]{
    return this.livingCells;
  }

  addLivingCell(cell: Cell) {
    this.livingCells.push(cell);
  }

  getNeighbours(cell: Cell): Array<Cell> {
    const { row, col } = cell;

    const cellsTocheck = [
      { row: row - 1, col: col },
      { row: row - 1, col: col + 1 },
      { row: row, col: col + 1 },
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col },
      { row: row + 1, col: col - 1 },
      { row: row, col: col - 1 },
      { row: row - 1, col: col - 1 },
    ].filter((cell) => !this.isOutOfBounds(cell));

    return cellsTocheck.map((coords) => this.getCellAt(coords));
  }

  private getCellAt({ row = 0, col = 0 } = {}): Cell {
    if (this.isOutOfBounds({ row, col })) {
      throw Error(`Cell is out of bounds.`);
    }

    return this.grid[row][col];
  }

  private isOutOfBounds({ row = 0, col = 0 } = {}): boolean {
    return this.isRowOutOfBounds(row) || this.isColOutOfBounds(col);
  }

  private isRowOutOfBounds(row:number) {
    return row < 0 || this.rows <= row;
  }

  private isColOutOfBounds(col:number) {
    return col < 0 || this.cols <= col;
  }

  livingNeighbours(cell: Cell): number {
    var neighbours = this.getNeighbours(cell);
    return neighbours.filter((cell) => cell.isAlive()).length;
  }

  getLivingGrid(): Array<Cell> {
    var result: Array<Cell> = [];

    this.livingCells.forEach((cell) => {
      result = this.addToLivingGrid(result, cell);
      result = this.addToLivingGrid(result, ...this.getNeighbours(cell));
    });

    return result;
  }
  addToLivingGrid(livingGrid: Array<Cell>, ...cells: Array<Cell>) {
    cells.forEach((cell) => {
      if (livingGrid.indexOf(cell) === -1) {
        livingGrid.push(cell);
      }
    });
    return livingGrid;
  }

  willDie(cell: Cell):boolean {
    const livingNeighbours = this.livingNeighbours(cell);
    return cell.isAlive() && (livingNeighbours > 3 || livingNeighbours < 2);
  }

  willAlive(cell: Cell) : boolean{
    return cell.isDead() && this.livingNeighbours(cell) === 3;
  }
}
