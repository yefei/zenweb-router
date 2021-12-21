import { Core } from '@zenweb/core';
import { setup } from '../src/index';

const app = new Core();
app.setup(setup);
app.start();
