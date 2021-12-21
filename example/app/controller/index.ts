import { Router } from '../../../src/index';
export const router = new Router();

router.get('/', ctx => {
  ctx.body = {
    hello: 'world',
    time: Date.now(),
  };
});

router.get('/err', ctx => {
  throw new Error('E!!');
});
