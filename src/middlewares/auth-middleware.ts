import {NextFunction, Request, RequestHandler, Response} from "express";
import ApiError from "../exceptions/api-error";
import tokenService from "../services/token-service";
import {TokenPayload} from "../types/TokenPayload";
import {ErrorMessages} from "../constants/errorMessages";


const validateRegistrationMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw ApiError.UnauthorizedError(ErrorMessages.USER_UNAUTHOREZED);
            }

            const decodedToken = tokenService.validateAccessToken(token) as TokenPayload;
            req['user'] = decodedToken;
            next();
        }
    } catch (err) {
        throw ApiError.UnauthorizedError(ErrorMessages.USER_UNAUTHOREZED);
    }
}

export default validateRegistrationMiddleware;