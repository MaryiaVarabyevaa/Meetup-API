import {
  validateLogin,
  validateRegistration,
  validatePayload
} from '../validators';

type ValidateMiddlewareType = typeof validateLogin | typeof validateRegistration | typeof validatePayload;


export { ValidateMiddlewareType };
