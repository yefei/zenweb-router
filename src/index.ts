import path = require('path');
import * as Router from '@koa/router';
import Debug from 'debug';
import * as globby from 'globby';
import { Core } from '@zenweb/core';

export {
  Router,
}

const debug = Debug('zenweb:router');

export interface RouterOption {
  discoverPaths?: string[];
}

const defaultRouterOption: RouterOption = {
  discoverPaths: [path.join(process.cwd(), 'app', 'controller')],
};

export function setup(core: Core, option?: RouterOption) {
  option = Object.assign({}, defaultRouterOption, option);
  debug('option: %o', option);
  const router = new Router();
  Object.defineProperty(core, 'router', { value: router });
  core.setupAfter(async () => {
    if (option.discoverPaths && option.discoverPaths.length) {
      for (const p of option.discoverPaths) {
        for (const file of await globby('**/*.{js,ts}', { cwd: p, absolute: true })) {
          const mod = require(file.slice(0, -3));
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

declare module '@zenweb/core' {
  interface Core {
    router: Router;
  }
}
