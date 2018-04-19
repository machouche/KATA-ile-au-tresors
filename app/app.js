'use strict';
const fs = require('fs');
const path = require('path');
const { store } = require('./store/store.js');
const { playTurn } = require('./game/gameActions/gameActions.js');
const { initGame } = require('./game/gameInit/gameInit.js');
const { createOutputData } = require('./game/outputData/createOutput.js');

const start = () => {
  console.log('starting..');

  const data = fs
    .readFileSync(path.join(__dirname, 'data.txt'), 'utf-8')
    .split('\n');
  const [, width, height] = data.find(elem => elem[0] === 'C').split('-');

  initGame({ width: +width, height: +height, data, gameData: store.gameData });

  while (store.gameData.gameTurn < store.gameData.gameLength) {
    store.gameData.heroes = playTurn({
      heroes: store.gameData.heroes,
      index: store.gameData.gameTurn,
      map: store.gameData.gameMap
    });
    store.gameData.gameTurn++;
  }

  const output = createOutputData(store.gameData);

  fs.writeFileSync(path.join(__dirname, 'output.txt'), output);
};

module.exports.start = start;
