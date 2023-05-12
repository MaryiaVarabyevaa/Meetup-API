import { Request, Response, NextFunction } from 'express';
import { ErrorMessages, StatusCodes } from '../constants';


const errorMiddleware = (_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(StatusCodes.SERVER_ERROR).json(ErrorMessages.UNEXPECTED_ERROR);
};

export { errorMiddleware };
