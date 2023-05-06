import { NextFunction, Request, Response } from 'express';
import authService from './auth.service';
import { StatusCodes } from '../../constants/index';
import { setCookies } from './utils';
import { ResponseType } from "./types";
import { TokenPair } from "../token/types";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<ResponseType> {
    try {
      const user = await authService.signup(req.body);
      setCookies(res, user);
      return res.status(StatusCodes.CREATED).json(user);
    } catch (err) {
      next(err);
      return;
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<ResponseType> {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      setCookies(res, user);
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
      return;
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<ResponseType> {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');
      return res.status(StatusCodes.NO_CONTENT);
    } catch (err) {
      next(err);
      return;
    }
  }

  async authenticateWithGoogle(req: Request, res: Response, next: NextFunction): Promise<ResponseType> {
    try {
      setCookies(res, req.user as TokenPair);
      res.redirect('/api/auth/profile');
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<ResponseType> {
    try {
      const { refreshToken } = req.cookies;
      const user = await authService.refresh(refreshToken);
      setCookies(res, user);
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
      return;
    }
  }

  async showUserData(req: Request, res: Response, next: NextFunction): Promise<ResponseType> {
    try {
      res.status(StatusCodes.OK).json(`Your email is ${req.user!.email}.`);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
