import path from 'node:path';
import { default as KoaRouter } from '@koa/router';
import Debug from 'debug';
import { globby } from 'globby';

const debug = Debug('zenweb:router');

/**
 * @param {KoaRouter.RouterOptions} [options]
 * @returns {KoaRouter}
 */
export function Router(options) {
  return new KoaRouter(options);
}

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
  const router = new KoaRouter();
  Object.defineProperty(core, 'router', { value: router });
  core.setupAfter(async () => {
    if (options.discoverPaths && options.discoverPaths.length) {
      for (const p of options.discoverPaths) {
        for (const file of await globby('**/*.js', { cwd: p, absolute: true })) {
          const mod = await import('file://' + file);
          if (mod.router instanceof KoaRouter) {
            router.use(mod.router.routes());
          }
        }
      }
    }
    core.use(router.routes());
    core.use(router.allowedMethods());
  });
}
