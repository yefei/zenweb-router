import { Core } from '@zenweb/core';
import * as KoaRouter from 'koa-router';

export interface RouterOptions {
  discoverPaths?: string[];
}

export declare function setup(core: Core, options?: RouterOptions): void;

declare module '@zenweb/core' {
  interface Core {
    router: KoaRouter;
  }
}
