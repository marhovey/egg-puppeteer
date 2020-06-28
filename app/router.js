'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/userContracts/:gbId', controller.contract.getInfo)
  router.get('/api/userContract/:gbId', controller.contract.getImg)
  router.put('/api/userContracts/:gbId', controller.contract.mergeInfo)
};
