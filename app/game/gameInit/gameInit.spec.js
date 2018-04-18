'use strict';
const { expect } = require('chai');
const { initGame } = require('./gameInit.js');
const { cellType } = require('../gameActions/gameActions.js');

describe('gameInit', () => {
  it('should init the gameData', () => {
    const gameData = {
      gameLength: 0,
      gameTurn: 0,
      mapSize: {
        width: undefined,
        height: undefined
      },
      mountains: [],
      tresors: [],
      heroes: [],
      gameMap: undefined
    };
    const data = [
      'C - 2 - 2',
      'M - 1 - 0',
      'T - 0 - 1 - 2',
      'A - lara - 1 - 1 - S - AADA'
    ];
    initGame({ width: 2, height: 2, data, gameData });

    const map = new Array(2).fill(undefined).map(
      elem =>
        (elem = new Array(2).fill(undefined).map(cell => ({
          type: cellType.VALLEY,
          hasHero: false,
          tresor: undefined
        })))
    );

    map[0][1].type = cellType.MOUNTAIN;
    map[1][0].tresor = { xAxis: 0, yAxis: 1, count: 2 };
    map[1][1].hasHero = true;

    const expected = {
      gameLength: 4,
      gameTurn: 0,
      mapSize: {
        width: 2,
        height: 2
      },
      mountains: [{ xAxis: 1, yAxis: 0 }],
      tresors: [{ xAxis: 0, yAxis: 1, count: 2 }],
      heroes: [
        {
          name: 'lara',
          xAxis: 1,
          yAxis: 1,
          orientation: 'S',
          sequence: ['A', 'A', 'D', 'A'],
          tresorCount:0
        }
      ],
      gameMap: map
    };
    expect(gameData).to.deep.equal(expected);
  });
});
