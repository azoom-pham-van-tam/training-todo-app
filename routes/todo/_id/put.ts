import { Request, Response } from 'express';
import { TODO_LIST_DATA } from '../../../constants/index.js';

export default (req: Request, res: Response) => {
  const description = String(req.body.description);
  const status = Number(req.body.status);
  const id = Number(req.params.id);
  const itemIndex = [...TODO_LIST_DATA].findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    throw new Error('TODO IS NOT EXIST ');
  }
  TODO_LIST_DATA[itemIndex] = { id, description, status };
  return res.send(TODO_LIST_DATA);
};
