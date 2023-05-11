import { Request } from 'express';
import { idSchema } from '../schemas';
import { ParamsId } from '../types';

const validateId = (req: Request) => {
  const paramsId: ParamsId = { id: +req.params.id };
  return idSchema(paramsId);
};

export { validateId };
