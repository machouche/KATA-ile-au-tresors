'use strict';
const fs = require('fs');
const path = require('path');
const { getGameDatas } = require('./repository/repository.js');
const {
  personFactory,
  cardinalPoints,
  getNextPosition,
  makeMove,
  cellType
} = require('./factorys/personFatory.js');

const start = () => {
  console.log('starting..');

  var text = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf-8');

  const mountains = [{ xAxis: 1, yAxis: 0 }, { xAxis: 2, yAxis: 1 }];
  const tresors = [
    { xAxis: 0, yAxis: 3, value: 2 },
    { xAxis: 1, yAxis: 3, value: 1 }
  ];
  const jones = {
    name: 'jones',
    orientation: cardinalPoints.EAST,
    xAxis: 1,
    yAxis: 1,
    sequence: ['A', 'A', 'D', 'A', 'D', 'A', 'G', 'G', 'A'],
    tresorCount: 0
  };
  const lara = {
    name: 'lara',
    orientation: cardinalPoints.SOUTH,
    xAxis: 1,
    yAxis: 1,
    sequence: ['A', 'A', 'D', 'A', 'G', 'A'],
    tresorCount: 0
  };
  let heroes = [lara];
  const map = { width: 3, height: 4 };

  const gameMap = new Array(map.height).fill(0).map(
    elem =>
      (elem = new Array(map.width).fill(0).map(cell => ({
        type: cellType.VALLEY,
        hasHero: false,
        tresor: 0
      })))
  );

  mountains.forEach(value => {
    gameMap[value.yAxis][value.xAxis] = {
      type: cellType.MOUNTAIN,
      hasHero: false,
      tresor: 0
    };
  });

  tresors.forEach(value => {
    gameMap[value.yAxis][value.xAxis].tresor = value.value;
  });
  let index = 0;
  const length = jones.sequence.length;

  while (index < length) {
    heroes = playTurn({ heroes, index, map: gameMap });
    index++;
  }
  console.log(heroes[0]);
};

// const getGameData = () => {}; // read the file & clean data
// const createGameOutput = () => {};
// const createInitialGameMap = () => {}; // create the gameMap with the data of the file;

//continue to iterate while max hero sequence is not over
const gameLoop = () => {
  while (currentTurn < maxPossibleTUrn) {
    playTurn({ heroes, currentTurn, map });
  }
};

// take heroes array and map over it
const playTurn = ({ heroes, index, map }) =>
  heroes.map(hero => {
    const heroAfterMove = makeMove({
      hero,
      action: hero.sequence[index],
      map
    });
    const currentCell = map[heroAfterMove.yAxis][heroAfterMove.xAxis];
    if (currentCell.tresor) {
      heroAfterMove.tresorCount++;
      currentCell.tresor--;
    }
    return heroAfterMove;
  });

const extractGameData = gameMap => {
  const map = {
    width: gameMap[0].length,
    height: gameMap.length
  };
  gameMap.reduce((acc, current) => {});
};

// // return true if position is not a mount or a player
// const isPositionAvaillable = () => {};

module.exports.start = start;
