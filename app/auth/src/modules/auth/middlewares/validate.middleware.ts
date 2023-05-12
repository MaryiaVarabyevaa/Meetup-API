import { NextFunction, Request, Response } from 'express';
import { ValidateMiddlewareType } from '../types';

const validateMiddleware = (validationFunction: ValidateMiddlewareType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = validationFunction(req);
    if (error) {
      throw Error("Error");
      // throw ApiExceptions.BadRequest(error);
    }
    next();
  };
};

export { validateMiddleware };
