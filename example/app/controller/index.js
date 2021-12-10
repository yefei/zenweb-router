import { Router } from '@zenweb/router';
export const router = new Router();

router.get('/', ctx => {
  ctx.body = {
    hello: 'world',
    time: Date.now(),
  };
});
