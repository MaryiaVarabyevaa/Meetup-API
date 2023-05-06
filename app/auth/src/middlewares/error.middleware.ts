import { Request, Response, NextFunction } from 'express';
import { ErrorMessages, StatusCodes } from "../constants";

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(StatusCodes.SERVER_ERROR).json(ErrorMessages.UNEXPECTED_ERROR);
}

export { errorMiddleware };