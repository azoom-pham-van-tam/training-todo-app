import { Request, Response } from 'express';
import { TODO_LIST_DATA } from '../../constants/index.js';

// LƯU MẢNG TRONG CONSTANT cho lần tiếp theo

export default (req: Request, res: Response) => {
  const description = String(req.body.description);
  const status = Number(req.body.status);
  const ids = TODO_LIST_DATA.map((todo) => todo.id);
  const newId = Math.max(...ids) + 1;
  TODO_LIST_DATA.push({ description, status, id: newId });
  return res.send(TODO_LIST_DATA);
};
