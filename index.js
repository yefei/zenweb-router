'use strict';

const debug = require('debug')('zenweb:router');
const path = require('path');
const Router = require('@koa/router');
const { discover } = require('@feiye/discover');

/**
 * @param {import('@zenweb/core').Core} core 
 * @param {object} [options]
 * @param {string[]} [options.discoverPaths]
 */
function setup(core, options) {
  options = Object.assign({
    discoverPaths: [path.join(process.cwd(), 'app', 'controller')],
  }, options);
  const router = new Router();
  core.koa.use(router.routes());
  core.koa.use(router.allowedMethods());
  Object.defineProperty(core, 'router', { value: router });
  debug('options: %o', options);
  if (options.discoverPaths && options.discoverPaths.length) {
    core.setupAfter(() => {
      options.discoverPaths.forEach(path => {
        const count = discover(path);
        debug('discover: %s %o files', path, count);
      });
    });
  }
}

module.exports = {
  setup,
};
