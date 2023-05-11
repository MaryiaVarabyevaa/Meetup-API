import { Request } from 'express';
import { createMeetupSchema } from '../schemas';

const validateCreateMeetup = (req: Request) => {
  return createMeetupSchema(req.body);
};

export { validateCreateMeetup };
