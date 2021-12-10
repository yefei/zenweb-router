import { Core } from '@zenweb/core';
import Router from '@koa/router';
export { default as Router } from '@koa/router';

export interface RouterOptions {
  discoverPaths?: string[];
}

export declare function setup(core: Core, options?: RouterOptions): void;

declare module '@zenweb/core' {
  interface Core {
    router: Router;
  }
}
