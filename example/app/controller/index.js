import { Router } from '@zenweb/router';
export const router = Router();

router.get('/', ctx => {
  ctx.body = {
    hello: 'world',
    time: Date.now(),
  };
});
