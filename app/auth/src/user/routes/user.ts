import express from "express";
import userController from "../user.controller";

const router = express.Router();

router.put('/:id/role', userController.changeUserRole);

export { router };