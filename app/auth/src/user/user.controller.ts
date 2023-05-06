import { Request, Response, NextFunction } from 'express';
import UserService from './user.service';
import { StatusCodes } from './constants/statusCodes';
import { ErrorMessages } from "./constants/errorMessages";

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

  async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { file } = req;

      if (!file) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: ErrorMessages.NO_FILE });
      }
      const updatedUser = await UserService.uploadAvatar(+id, file.path);
      return res.status(StatusCodes.OK).json(updatedUser);
    } catch (err) {
      next(err);
      return;
    }
  }
}

export default new UserController();
