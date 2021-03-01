import '@zenweb/core';
import * as KoaRouter from 'koa-router';

declare module '@zenweb/core' {
  interface Core {
    router: KoaRouter;
  }
}
