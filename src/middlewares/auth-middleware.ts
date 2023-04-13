import ApiError from "../exceptions/api-error";
import tokenService from "../services/token-service";

export default (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw ApiError.UnauthorizedError();
        }

        const decodedToken = tokenService.validateAccessToken(token);
        req.user = decodedToken;
        next();
    } catch (err) {
        throw ApiError.UnauthorizedError();
    }
}