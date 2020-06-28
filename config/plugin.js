'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  view: {
    enable: true,
    package: 'egg-view'
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  }
};
