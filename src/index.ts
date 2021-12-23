import path = require('path');
import * as Router from '@koa/router';
import * as globby from 'globby';
import { SetupFunction } from '@zenweb/core';

export {
  Router,
}

export interface RouterOption {
  discoverPaths?: string[];
}

const defaultRouterOption: RouterOption = {
  discoverPaths: [path.join(process.cwd(), 'app', 'controller')],
};

export default function setup(option?: RouterOption): SetupFunction {
  option = Object.assign({}, defaultRouterOption, option);
  return function router(setup) {
    setup.debug('option: %o', option);
    const router = new Router();
    setup.defineCoreProperty('router', { value: router });
    setup.after(async () => {
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
      setup.middleware(router.routes());
      setup.middleware(router.allowedMethods());
    });
  }
}

declare module '@zenweb/core' {
  interface Core {
    router: Router;
  }
}
