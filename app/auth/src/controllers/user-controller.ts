import { Request, Response, NextFunction } from 'express';
import { AuthControllerReturnType } from 'AuthControllerReturnType';
import userService from '../services/user-service';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction): AuthControllerReturnType {
    try {
      const userData = await userService.registration(req.body);
      return res.status(201).json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login() {}

  async refresh() {}

  async changeUserRole() {}

  async updateUserProfile() {}
}

export default new UserController();
