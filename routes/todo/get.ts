import { Request, Response } from 'express';
import { TODO_LIST_DATA, TODO_TYPE } from '../../constants/index.js';

export default (req: Request, res: Response) => {
  const type = Number(req.query.type);
  if (!Object.values(TODO_TYPE).includes(type)) {
    throw new Error('TYPE IS NOT EXIST');
  }

  if (type === TODO_TYPE.DONE) {
    return res.send(TODO_LIST_DATA.filter((todo) => todo.status === TODO_TYPE.DONE));
  }

  return res.send(TODO_LIST_DATA.filter((todo) => todo.status === TODO_TYPE.TODO));
};
