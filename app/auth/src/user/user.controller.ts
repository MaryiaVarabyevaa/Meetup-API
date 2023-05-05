import { Request, Response, NextFunction } from 'express';
import UserService from './user.service';
import { StatusCodes } from './constants/statusCodes';

class UserController {
  async changeUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserService.changeUserRole(+id);
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      next(err);
      return;
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      if (users.length === 0) return res.status(404).json({ message: 'No users found' });
      return res.status(200).json(users);
    } catch (err) {
      next(err);
      return;
    }
  }
}

export default new UserController();
