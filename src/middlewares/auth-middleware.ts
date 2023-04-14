import {NextFunction, Response} from "express";
import ApiError from "../exceptions/api-error";
import tokenService from "../services/token-service";
import {AuthenticatedRequest} from "../types/AuthenticatedRequest";
import {TokenPayload} from "../types/TokenPayload";


export default (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw ApiError.UnauthorizedError();
            }

            const decodedToken = tokenService.validateAccessToken(token) as TokenPayload;
            req.user = decodedToken;
            next();
        }
    } catch (err) {
        throw ApiError.UnauthorizedError();
    }
}