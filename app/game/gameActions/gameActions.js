const getNextOrientation = ({ orientation, rotation }) => {
  if (rotation === 'D' || rotation === 'G') {
    switch (orientation) {
      case cardinalPoints.NORTH:
        return rotation === 'D' ? cardinalPoints.EAST : cardinalPoints.WEST;
      case cardinalPoints.SOUTH:
        return rotation === 'D' ? cardinalPoints.WEST : cardinalPoints.EAST;
      case cardinalPoints.EAST:
        return rotation === 'D' ? cardinalPoints.SOUTH : cardinalPoints.NORTH;
      case cardinalPoints.WEST:
        return rotation === 'D' ? cardinalPoints.NORTH : cardinalPoints.SOUTH;
    }
    return orientation;
  }
};

const getNextPosition = (hero, map) => {
  const { orientation, xAxis, yAxis } = hero;
  const width = map[0].length;
  const height = map.length;
  switch (orientation) {
    case cardinalPoints.NORTH:
      return { xAxis, yAxis: yAxis - 1 > 0 ? yAxis - 1 : 0 };
    case cardinalPoints.SOUTH:
      const toto = { xAxis, yAxis: yAxis + 1 >= height ? yAxis : yAxis + 1 };
      return toto;
    case cardinalPoints.EAST:
      return { yAxis, xAxis: xAxis + 1 >= width ? xAxis : xAxis + 1 };
    case cardinalPoints.WEST:
      return { yAxis, xAxis: xAxis - 1 > 0 ? xAxis - 1 : 0 };
  }
};

const _makeMove = ({ hero, action, map }) => {
  if (action === 'A') {
    const { xAxis, yAxis } = getNextPosition(hero, map);
    return _isMoveValid(map[yAxis][xAxis]) ? { ...hero, xAxis, yAxis } : hero;
  } else {
    const { orientation } = hero;
    const newOrientation = getNextOrientation({
      orientation,
      rotation: action
    });
    return { ...hero, orientation: newOrientation };
  }
};

const _isMoveValid = cell => !(cell.type === cellType.MOUNTAIN || cell.hasHero);

const playTurn = ({ heroes, index, map }) =>
  heroes.map(hero => {
    const { xAxis: previousX, yAxis: previousY } = hero;
    const heroAfterMove = _makeMove({
      hero,
      action: hero.sequence[index],
      map
    });
    const { xAxis: newX, yAxis: newY } = heroAfterMove;

    const newCell = map[heroAfterMove.yAxis][heroAfterMove.xAxis];
    if (
      newCell.tresor &&
      newCell.tresor.count &&
      (newX !== previousX || newY !== previousY)
    ) {
      heroAfterMove.tresorCount++;
      newCell.tresor.count--;
    }
    return heroAfterMove;
  });

const cardinalPoints = {
  NORTH: 'N',
  SOUTH: 'S',
  EAST: 'E',
  WEST: 'O'
};
const cellType = {
  MOUNTAIN: 'M',
  VALLEY: 'V'
};
module.exports = {
  getNextOrientation,
  getNextPosition,
  cardinalPoints,
  cellType,
  playTurn
};
