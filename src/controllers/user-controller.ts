import { Request, Response, NextFunction } from 'express';
import userService from "../services/user-service";
import {NextFunction} from "express";
import {AuthenticatedRequest} from "../types/AuthenticatedRequest";
import {CreateUser} from "../types/CreateUser";

class UserController {
    async registration(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
        try {
            const userData = await userService.registration(req.userValidatedData as CreateUser);
            // срок хранения куки 30 дней
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(201).json(userData);
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(userData);
        } catch (err) {
            next(err);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<Response>  {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(userData);
        } catch (err) {
            next(err);
        }
    }

    async changeUserRole(req: Request, res: Response, next: NextFunction): Promise<Response>  {
        try {
            const { id } = req.params;
            const organizer = await userService.changeUserRole(+id);
            return res.status(200).json(organizer);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();