import { Component, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

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

  started: boolean = false;

  generation: number = 0;

  $subscription: Subscription = new Subscription;

  constructor(private gameOfLifeService: GameOfLifeService) {}

  ngOnInit() {
    this.grid = this.gameOfLifeService.initGrid(this.rows, this.cols);
  }

  setAlive(cell:Cell): void {
    cell.setAlive();
    this.gameOfLifeService.addLivingCell(cell);
  }

  startGame() {
    if (!this.started) {
      const source = interval(500);

      this.$subscription = source.subscribe((val) =>{
        this.gameOfLifeService.getNextGeneration();
        this.generation++;
      });

      this.started = true;
    }
  }

  stopGame() {
    this.$subscription.unsubscribe();
    this.started = false;
  }

  resetGame() {
    this.grid = this.gameOfLifeService.initGrid(this.rows, this.cols);
    this.$subscription.unsubscribe();
    this.started = false;
    this.generation=0;
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

}
