import {
  validateGoogle,
  validateGoogleCallback,
  validateLogin,
  validateRegistration,
  validateToken
} from '../validators';

type ValidateMiddlewareType =
  | typeof validateGoogleCallback
  | typeof validateGoogle
  | typeof validateLogin
  | typeof validateRegistration
  | typeof validateToken;

export { ValidateMiddlewareType };
