'use strict';

// C - 3 - 4
// M - 1 - 1
// M - 2 - 2
// T - 0 3 - 2
// T - 1 - 3 - 1
// A indiana - 1 - 1 - AADADA

const fs = require('fs');

const mockData = {
  width: 3,
  height: 4
};

module.exports = {
  getGameDatas: () => {
    return mockData;
  }
};
