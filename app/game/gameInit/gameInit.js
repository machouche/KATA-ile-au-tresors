const { cellType } = require('../gameActions/gameActions.js');

const createGameMap = ({ width, height }) => {
  const map = new Array(height).fill(undefined).map(
    elem =>
      (elem = new Array(width).fill(undefined).map(cell => ({
        type: cellType.VALLEY,
        hasHero: false,
        tresor: undefined
      })))
  );
  return map;
};

const setMountain = (value, gameData) => {
  const [, xAxis, yAxis] = value;
  const mountain = {
    xAxis: +xAxis,
    yAxis: +yAxis
  };
  gameData.mountains.push(mountain);
  gameData.gameMap[yAxis][xAxis].type = cellType.MOUNTAIN;
};

const setTresor = (value, gameData) => {
  const [, xAxis, yAxis, count] = value;
  const tresor = {
    xAxis: +xAxis,
    yAxis: +yAxis,
    count: +count
  };
  gameData.tresors.push(tresor);
  gameData.gameMap[yAxis][xAxis].tresor = tresor;
};

const setHero = (value, gameData) => {
  const [, name, xAxis, yAxis, orientation, sequenceString] = value;
  const sequence = sequenceString.split('');
  const hero = {
    name,
    xAxis: +xAxis,
    yAxis: +yAxis,
    orientation,
    sequence,
    tresorCount: 0
  };
  gameData.heroes.push(hero);
  gameData.gameMap[+yAxis][+xAxis].hasHero = true;

  if (sequence.length > gameData.gameLength) {
    gameData.gameLength = sequence.length;
  }
};

const setMapSize = (value, gameData) => {
  const [, width, height] = value;
  gameData.mapSize.width = +width;
  gameData.mapSize.height = +height;
};
const initGame = ({ width, height, data, gameData }) => {
  gameData.gameMap = createGameMap({ width: +width, height: +height });

  data.forEach(line => {
    const value = line.split(' - ');
    switch (value[0]) {
      case 'C':
        setMapSize(value, gameData);
        break;
      case 'M':
        setMountain(value, gameData);
        break;
      case 'T':
        setTresor(value, gameData);
        break;
      case 'A':
        setHero(value, gameData);
        break;
    }
  });
};
module.exports = {
  initGame
};
