import { NextFunction, Request, Response } from "express";
import userService from "../services/user-service";

class UserController {
  async registration(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userData = await userService.registration(req.userValidatedData);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.status(201).json(userData);
    } catch (err) {
      next(err);
      return;
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(200).json(userData);
    } catch (err) {
      next(err);
      return;
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<Response | void>  {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.status(200).json(userData);
    } catch (err) {
      next(err);
      return;
    }
  }

  async changeUserRole(req: Request, res: Response, next: NextFunction): Promise<Response | void>  {
    try {
      const { id } = req.params;
      const organizer = await userService.changeUserRole(+id);
      return res.status(200).json(organizer);
    } catch (err) {
      next(err);
      return;
    }
  }
}

export default new UserController();
