import {
  validateCreateMeetup,
  validateUpdateMeetup,
  validateId,
  validateReport,
} from '../validators';

type ValidateMiddlewareType =
  | typeof validateCreateMeetup
  | typeof validateUpdateMeetup
  | typeof validateId
  | typeof validateReport;

export { ValidateMiddlewareType };
