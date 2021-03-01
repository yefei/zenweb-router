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
  debug('options: %o', options);
  const router = new Router();
  Object.defineProperty(core, 'router', { value: router });
  core.setupAfter(() => {
    if (options.discoverPaths && options.discoverPaths.length) {
      options.discoverPaths.forEach(path => {
        const count = discover(path);
        debug('discover: %s %o files', path, count);
      });
    }
    core.koa.use(router.routes());
    core.koa.use(router.allowedMethods());
  });
}

module.exports = {
  setup,
};
