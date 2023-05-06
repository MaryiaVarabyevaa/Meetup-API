import express from "express";
import userController from "../user.controller";
import { multerMiddleware } from "../middlewares";

const router = express.Router();

router.put('/:id/role', userController.changeUserRole);
router.post('/:id/avatar', multerMiddleware, userController.uploadAvatar);

export { router };