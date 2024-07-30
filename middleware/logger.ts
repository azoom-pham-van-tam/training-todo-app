import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const now = new Date().toISOString();
  console.log(`${req.method}  ${req.url}  ${now}`);
  next();
};
