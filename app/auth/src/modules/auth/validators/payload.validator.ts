import { Request } from 'express';
import { payloadSchema } from '../schemas';

const validatePayload = (req: Request) => {
  return payloadSchema(req.body.user);
};

export { validatePayload };
