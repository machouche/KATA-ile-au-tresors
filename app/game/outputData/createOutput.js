const createOutputData = gameData => {
  const { heroes, mapSize, mountains, tresors } = gameData;
  const mapOutput = `C - ${mapSize.width} - ${mapSize.height}\n`;

  const heroesOuput = heroes.reduce((acc, hero) => {
    acc += `A - ${hero.name} - ${hero.xAxis} - ${hero.yAxis} - ${
      hero.orientation
    } - ${hero.sequence.join('')}\n`;
    return acc;
  }, ``);

  const mountainsOuput = mountains.reduce((acc, tresor) => {
    acc += `M - ${tresor.xAxis} - ${tresor.yAxis}\n`;
    return acc;
  }, ``);

  const tresorsOuput = tresors.reduce((acc, tresor) => {
    acc +=
      tresor.count > 0
        ? `T - ${tresor.xAxis} - ${tresor.yAxis} - ${tresor.count}\n`
        : '';
    return acc;
  }, ``);
  return mapOutput + mountainsOuput + tresorsOuput + heroesOuput;
};

module.exports = {
  createOutputData
};
