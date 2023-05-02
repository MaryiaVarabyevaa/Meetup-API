import { Request, Response, NextFunction } from "express";
import authService from "./auth.service";
import { cookieExpiration } from "./constants/cookieExpiration";
import { StatusCodes } from "./constants/statusCodes";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { validatedData: userDto } = req;
      const user = await authService.signup(userDto);
      res.cookie('refreshToken', user.refreshToken, { expires: cookieExpiration, httpOnly: true });
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
      res.cookie('refreshToken', user.refreshToken, { expires: cookieExpiration, httpOnly: true });
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {

    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const user = await authService.refresh(refreshToken);
      res.cookie('refreshToken', user.refreshToken, { expires: cookieExpiration, httpOnly: true });
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
      return;
    }
  }
}

export default new AuthController();