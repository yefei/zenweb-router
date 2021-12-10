import path from 'node:path';
import Router from '@koa/router';
export { default as Router } from '@koa/router';
import Debug from 'debug';
import { globby } from 'globby';

const debug = Debug('zenweb:router');

/**
 * @param {import('@zenweb/core').Core} core 
 * @param {object} [options]
 * @param {string[]} [options.discoverPaths]
 */
export function setup(core, options) {
  options = Object.assign({
    discoverPaths: [path.join(process.cwd(), 'app', 'controller')],
  }, options);
  debug('options: %o', options);
  const router = new Router();
  Object.defineProperty(core, 'router', { value: router });
  core.setupAfter(async () => {
    if (options.discoverPaths && options.discoverPaths.length) {
      for (const p of options.discoverPaths) {
        for (const file of await globby('**/*.js', { cwd: p, absolute: true })) {
          const mod = await import('file://' + file);
          if (mod.router instanceof Router) {
            router.use(mod.router.routes());
          }
        }
      }
    }
    core.use(router.routes());
    core.use(router.allowedMethods());
  });
}
