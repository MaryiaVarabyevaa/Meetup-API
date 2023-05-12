import { Request, Response, NextFunction } from 'express';
import tokenService from '../../token/token.service';
import { ApiExceptions } from '../../../exceptions';

const authenticateMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    next(ApiExceptions.UnauthorizedError());
  }
  const data = await tokenService.validateAccessToken(accessToken);
  req.user = data;
  next();
};

export { authenticateMiddleware };
