# ZenWeb Router module

[ZenWeb](https://www.npmjs.com/package/zenweb)

index.js
```js
import { Core } from '@zenweb/core';

const app = new Core();
app.setup('@zenweb/router');
app.start();
```

app/controller/test.js
```js
import { newRouter } from '@zenweb/router';
export const router = newRouter();

router.get('/', ctx => {
  ctx.body = {
    hello: 'world',
    time: Date.now(),
  };
});
```
