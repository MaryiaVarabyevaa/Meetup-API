import { RequestHandler } from 'express';
import passport from 'passport';

const passportMiddleware = (
  strategy: string,
  options: passport.AuthenticateOptions,
): RequestHandler => {
  return passport.authenticate(strategy, options);
};

export { passportMiddleware };
