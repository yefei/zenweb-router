import { Core } from '@zenweb/core';
import { default as KoaRouter } from '@koa/router';

export interface RouterOptions {
  discoverPaths?: string[];
}

export declare function Router(options: KoaRouter.RouterOptions): KoaRouter;

export declare function setup(core: Core, options?: RouterOptions): void;

declare module '@zenweb/core' {
  interface Core {
    router: KoaRouter;
  }
}
