'use strict';
const { expect } = require('chai');
const {
  getNextPosition,
  cardinalPoints,
  getNextOrientation,
  makeMove
} = require('./gameActions.js');

describe('getNextOrientation  ', () => {
  describe('when orientation is D', () => {
    it('should return N if input is O & rotation is D', () => {
      const newOrientation = getNextOrientation({
        orientation: cardinalPoints.WEST,
        rotation: 'D'
      });

      const expected = 'N';
      expect(newOrientation).to.equal(expected);
    });

    it('should return S if input is E & rotation is D', () => {
      const newOrientation = getNextOrientation({
        orientation: cardinalPoints.EAST,
        rotation: 'D'
      });

      const expected = cardinalPoints.SOUTH;
      expect(newOrientation).to.equal(expected);
    });

    it('should return E if input is N & rotation is D', () => {
      const newOrientation = getNextOrientation({
        orientation: cardinalPoints.NORTH,
        rotation: 'D'
      });

      const expected = 'E';
      expect(newOrientation).to.equal(expected);
    });

    it('should return O if input is S & rotation is D', () => {
      const newOrientation = getNextOrientation({
        orientation: cardinalPoints.SOUTH,
        rotation: 'D'
      });

      const expected = cardinalPoints.WEST;
      expect(newOrientation).to.equal(expected);
    });
  });

  describe('when orientation is G', () => {
    it('should return O if input is N & rotation is G', () => {
      const newOrientation = getNextOrientation({
        orientation: cardinalPoints.WEST,
        rotation: 'G'
      });

      const expected = cardinalPoints.SOUTH;
      expect(newOrientation).to.equal(expected);
    });

    it('should return S if input is E & rotation is G', () => {
      const newOrientation = getNextOrientation({
        orientation: cardinalPoints.EAST,
        rotation: 'G'
      });

      const expected = cardinalPoints.NORTH;
      expect(newOrientation).to.equal(expected);
    });

    it('should return E if input is N & rotation is G', () => {
      const newOrientation = getNextOrientation({
        orientation: cardinalPoints.NORTH,
        rotation: 'G'
      });

      const expected = cardinalPoints.WEST;
      expect(newOrientation).to.equal(expected);
    });

    it('should return O if input is S & rotation is G', () => {
      const newOrientation = getNextOrientation({
        orientation: cardinalPoints.SOUTH,
        rotation: 'G'
      });

      const expected = cardinalPoints.EAST;
      expect(newOrientation).to.equal(expected);
    });
  });
});

describe('getNextPosition', () => {
  const person = {
    name: 'indiana',
    orientation: undefined,
    xAxis: 2,
    yAxis: 2
  };
  const map = new Array(5).fill(0).map(elem => (elem = new Array(5).fill(0)));

  it('should decrement yAxis when orientation is N', () => {
    const personTest = { ...person, orientation: cardinalPoints.NORTH };
    const axis = getNextPosition(personTest, map);
    const { xAxis, yAxis } = personTest;
    const expected = { xAxis, yAxis: 1 };

    expect(axis).to.deep.equal(expected);
  });

  it('should increment yAxis when orientation is S', () => {
    const personTest = { ...person, orientation: cardinalPoints.SOUTH };
    const axis = getNextPosition(personTest, map);
    const { xAxis, yAxis } = personTest;
    const expected = { xAxis, yAxis: 3 };

    expect(axis).to.deep.equal(expected);
  });

  it('should increment xAxis when orientation is E', () => {
    const personTest = { ...person, orientation: cardinalPoints.EAST };
    const axis = getNextPosition(personTest, map);
    const { xAxis, yAxis } = personTest;
    const expected = { xAxis: 3, yAxis };

    expect(axis).to.deep.equal(expected);
  });

  it('should decrement xAxis when orientation is O', () => {
    const personTest = { ...person, orientation: cardinalPoints.WEST };
    const axis = getNextPosition(personTest, map);
    const { xAxis, yAxis } = personTest;
    const expected = { xAxis: 1, yAxis };

    expect(axis).to.deep.equal(expected);
  });

  it('should return yAxis = 0 if yAxis < 0', () => {
    const personTest = {
      ...person,
      yAxis: 0,
      orientation: cardinalPoints.NORTH
    };
    const axis = getNextPosition(personTest, map);
    const { xAxis, yAxis } = personTest;
    const expected = { yAxis, xAxis };

    expect(axis).to.deep.equal(expected);
  });

  it('should return xAxis = 0 if xAxis < 0', () => {
    const personTest = {
      ...person,
      xAxis: 0,
      orientation: cardinalPoints.WEST
    };
    const axis = getNextPosition(personTest, map);
    const { xAxis, yAxis } = personTest;
    const expected = { xAxis, yAxis };

    expect(axis).to.deep.equal(expected);
  });

  it('should never outbound the map width', () => {
    const personTest = {
      ...person,
      xAxis: 1,
      yAxis: 1,
      orientation: cardinalPoints.SOUTH
    };
    const mapTest = new Array(2)
      .fill(0)
      .map(elem => (elem = new Array(2).fill(0)));

    const axis = getNextPosition(personTest, mapTest);
    const { xAxis, yAxis } = personTest;
    const expected = { xAxis, yAxis };
    expect(axis).to.deep.equal(expected);
  });

  it('should never outbound the map height', () => {
    const personTest = {
      ...person,
      xAxis: 1,
      yAxis: 1,
      orientation: cardinalPoints.EAST
    };
    const mapTest = new Array(2)
      .fill(0)
      .map(elem => (elem = new Array(2).fill(0)));

    const axis = getNextPosition(personTest, mapTest);
    const { xAxis, yAxis } = personTest;
    const expected = { xAxis, yAxis };
    expect(axis).to.deep.equal(expected);
  });
});

describe('makeMove', () => {
  const hero = {
    name: 'indiana',
    orientation: cardinalPoints.SOUTH,
    xAxis: 2,
    yAxis: 2
  };

  const map = { width: 5, height: 5 };

  it('should change xAxis and/or yAxis of hero', () => {

  });

  it('should change orientation of hero', () => {

  });
});
