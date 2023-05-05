import { Request, Response, NextFunction } from "express";
import authService from "./auth.service";
import { accessCookieExpiration, refreshCookieExpiration } from "./constants/cookieExpiration";
import { StatusCodes } from "./constants/statusCodes";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      // const { validatedData: userDto } = req;
      const user = await authService.signup(req.body);
      res.cookie('refreshToken', user.refreshToken, { expires: refreshCookieExpiration, httpOnly: true });
      res.cookie('accessToken', user.accessToken, { expires: accessCookieExpiration, httpOnly: true });
      res.status(StatusCodes.CREATED).json(user);
    } catch (err) {
      next(err);
      return;
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body;
      const user = await authService.login(email, password);
      res.cookie('refreshToken', user.refreshToken, { expires: refreshCookieExpiration, httpOnly: true });
      res.cookie('accessToken', user.accessToken, { expires: accessCookieExpiration, httpOnly: true });
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
      return;
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');
      res.status(StatusCodes.NO_CONTENT);
    } catch (err) {
      next(err);
      return;
    }
  }

  async authenticateWithGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      res.cookie('refreshToken', req.user!.refreshToken, { expires: refreshCookieExpiration, httpOnly: true });
      res.cookie('accessToken', req.user!.accessToken, { expires: accessCookieExpiration, httpOnly: true });
      res.redirect('/api/auth/profile');
    } catch (err) {
      next(err);
      return;
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const user = await authService.refresh(refreshToken);
      res.cookie('refreshToken', user.refreshToken, { expires: refreshCookieExpiration, httpOnly: true });
      res.cookie('accessToken', user.accessToken, { expires: accessCookieExpiration, httpOnly: true });
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
      return;
    }
  }

  async showUserData(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.OK).json( `Your email is ${req.user!.email}.`)
    } catch (err) {
      next(err);
      return;
    }
  }
}

export default new AuthController();