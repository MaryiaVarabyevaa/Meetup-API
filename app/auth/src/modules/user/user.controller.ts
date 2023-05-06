import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";
import { ApiExceptions } from "../../exceptions";
import { ErrorMessages, StatusCodes } from "../../constants";


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
        throw ApiExceptions.BadRequest(ErrorMessages.NO_FILE);
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
