import { Injectable } from '@angular/core';
import { Cell } from './cell/cell';

@Injectable({
  providedIn: 'root'
})
export class GameOfLifeService {

  private grid: Cell[][] = [];

  private rows: number = 5;

  private cols: number = 5;

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
}
