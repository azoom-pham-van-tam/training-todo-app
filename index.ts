import express, { NextFunction, Request, Response } from 'express';
import nnn from 'nnn-router';
import { PORT } from './constants/index.js';
import logger from './middleware/logger.js';

const app = express();
const port = PORT;
const options = {
  routeDir: '/dist/routes',
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger, nnn(options));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  return res.status(500).send(error.message);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
