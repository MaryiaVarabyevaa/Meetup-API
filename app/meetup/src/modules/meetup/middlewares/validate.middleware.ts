import { NextFunction, Request, Response } from 'express';
import { ValidateMiddlewareType } from '../types';

const validateMiddleware = (validationFunction: ValidateMiddlewareType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validationFunction(req);
    if (error) {
      // throw ApiExceptions.BadRequest(error);
    }
    next();
  };
};

export { validateMiddleware };
