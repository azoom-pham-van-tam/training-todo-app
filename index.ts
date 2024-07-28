import express, { Request, Response } from 'express';
import nnn from 'nnn-router';
import { PORT } from './constants/index.js';

const app = express();
const port = PORT;
const options = {
  routeDir: '/dist/routes',
};

app.use(nnn(options));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
