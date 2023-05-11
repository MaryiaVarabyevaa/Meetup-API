import { Request } from 'express';
import { updateMeetupSchema } from '../schemas';

const validateUpdateMeetup = (req: Request) => {
  return updateMeetupSchema(req.body);
};

export { validateUpdateMeetup };
