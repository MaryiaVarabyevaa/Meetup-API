import { Request, Response, NextFunction } from "express";
import { ValidateMiddlewareType } from "../types";
import { StatusCodes } from "../constants";

const validateMiddleware = (validationFunction: ValidateMiddlewareType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validationFunction(req);
    if (error) {
      return  res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
    next();
    return;
  }
}

export { validateMiddleware };