'use strict';

const path = require('path');
const Router = require('@koa/router');
const { discover } = require('./lib/utils');

/**
 * @param {import('@zenweb/core').Core} core 
 * @param {*} [options]
 */
function setup(core, options) {
  const router = new Router();
  Object.defineProperty(core, 'router', { value: router });
  core.setupAfter(() => {
    discover(path.join(process.cwd(), 'app'));
    core.koa.use(router.routes());
    core.koa.use(router.allowedMethods());
  });
}

module.exports = {
  setup,
};
