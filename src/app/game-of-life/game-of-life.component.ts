import { Component, Input, OnInit } from '@angular/core';

import { Cell } from '../cell/cell';
import { GameOfLifeService } from '../game-of-life.service';
@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent implements OnInit {
  @Input()
  rows: number = 5;
  @Input()
  cols: number = 5;
  grid: Cell[][] = [];

  constructor(private gameOfLifeService: GameOfLifeService) {}

  ngOnInit() {
    this.grid = this.gameOfLifeService.initGrid(this.rows, this.cols);
  }

  setAlive(cell:Cell): void {
    cell.setAlive();
    this.gameOfLifeService.addLivingCell(cell);
  }

  startGame() {
    
  }

  getGenerationCount() {
    this.gameOfLifeService.generationCount;
  }

  stopGame() {
  
  }

  resetGame() {
 
  }

  

}
