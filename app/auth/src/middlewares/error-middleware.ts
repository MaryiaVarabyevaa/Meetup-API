import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';
import { ErrorMessages } from "../constants/errorMessages";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }

  return res.status(500).json({ message: ErrorMessages.UNEXPECTED_ERROR });
}