import { Core } from '@zenweb/core';
import router from '../src/index';

const app = new Core();
app.setup(router());
app.start();
