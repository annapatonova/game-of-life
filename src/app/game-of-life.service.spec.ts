import { TestBed } from '@angular/core/testing';

import { GameOfLifeService } from './game-of-life.service';
import { Cell } from './cell/cell';

describe('GameOfLifeService', () => {
  let service: GameOfLifeService;
  let grid: Cell[][];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameOfLifeService);
    grid = [
      [
        new Cell(0, 0),
        new Cell(0, 1),
        new Cell(0, 2),
        new Cell(0, 3),
        new Cell(0, 4),
      ],
      [
        new Cell(1, 0),
        new Cell(1, 1),
        new Cell(1, 2),
        new Cell(1, 3),
        new Cell(1, 4),
      ],
      [
        new Cell(2, 0),
        new Cell(2, 1),
        new Cell(2, 2),
        new Cell(2, 3),
        new Cell(2, 4),
      ],
      [
        new Cell(3, 0),
        new Cell(3, 1),
        new Cell(3, 2),
        new Cell(3, 3),
        new Cell(3, 4),
      ],
      [
        new Cell(4, 0),
        new Cell(4, 1),
        new Cell(4, 2),
        new Cell(4, 3),
        new Cell(4, 4),
      ],
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#initGrid', () => {
    it('should init grid 5x5', () => {
      expect(service.initGrid(5, 5)).toEqual(grid);
    });
  });

  describe('#getNeighbours', () => {
    it('should get correct heighbours', () => {
      let testGrid = service.initGrid(5, 5);
      expect(service.getNeighbours(testGrid[0][0])).toEqual([
        testGrid[0][1],
        testGrid[1][1],
        testGrid[1][0],
      ]);
    });
  });

  describe('#livingNeighbours', () => {
    it('should get correct number of living neighbours', () => {
      let testGrid = service.initGrid(5, 5);
      testGrid[0][1].setAlive();
      expect(service.livingNeighbours(testGrid[0][0])).toEqual(1);
    });
  });

  describe('#getLivingGrid', () => {
    it('should get livings cells and all thiere neighbours', () => {
      let testGrid = service.initGrid(5, 5);
      testGrid[0][0].setAlive();
      service.addLivingCell(testGrid[0][0]);
      testGrid[2][2].setAlive();
      service.addLivingCell(testGrid[2][2]);
      expect(service.getLivingGrid().map((cell) => {
        cell.row, cell.col;
      }).sort())
      .toEqual([
        testGrid[0][0],testGrid[0][1],
        testGrid[1][0],testGrid[1][1],testGrid[1][2],testGrid[1][3],
        testGrid[2][1],testGrid[2][2],testGrid[2][3],
        testGrid[3][1],testGrid[3][2],testGrid[3][3]
      ].map((cell) => {
        cell.row, cell.col;
      })
      .sort());
    });
  });


});
