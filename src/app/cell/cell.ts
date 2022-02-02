/**
 * Represents a cell in the Game of Life.
 */
 export class Cell {
    private status: number = 0;
    private tempStatus: number = 0;
  
    private _row: number;
    private _col: number;
  
    constructor(row: number, col: number) {
      this._row = row;
      this._col = col;
    }
  
    get row(): number {
      return this._row;
    }
  
    get col(): number {
      return this._col;
    }
  
    setAlive() {
      this.status = 1;
    }
  
    setTempState(status: number) {
      this.tempStatus = status;
    }
  
    isAlive() {
      return this.status === 1;
    }
  
    isDead() {
      return this.status === 0;
    }
  
    updateCurrentState() {
      this.status = this.tempStatus;
    }
  }
  