process.env.DEBUG = '*';

const { Core } = require('@zenweb/core');
const { setup } = require('..');
const app = new Core();
app.setup(setup);
app.boot().then(() => {
  app.router.get('/', ctx => {
    ctx.body = 'Hello';
  });
  app.listen();
});
