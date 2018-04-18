'use strict';
const fs = require('fs');
const path = require('path');
const { store } = require('./store/store.js');
const { playTurn } = require('./game/gameActions/gameActions.js');
const { initGame } = require('./game/gameInit/gameInit.js');

const start = () => {
  console.log('starting..');

  const data = fs
    .readFileSync(path.join(__dirname, 'data.txt'), 'utf-8')
    .split('\n');
  const [, width, height] = data.find(elem => elem[0] === 'C').split('-');

  initGame({ width, height, data, gameData: store.gameData });

  while (store.gameData.gameTurn < store.gameData.gameLength) {
    store.gameData.heroes = playTurn({
      heroes: store.gameData.heroes,
      index: store.gameData.gameTurn,
      map: store.gameData.gameMap
    });
    store.gameData.gameTurn++;
  }
  console.log('after: ', store.gameData);
};

module.exports.start = start;
