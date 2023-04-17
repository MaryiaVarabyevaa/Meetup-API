import {NextFunction, RequestHandler, Response, Request} from "express";
import CreateUserDto from "../dtos/create-user.dto";

const registrationMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = CreateUserDto(req.body);
    if (error) {
        res.status(400).json({message: 'One or more fields in the request body are invalid.'});
    } else {
        req.userValidatedData = value;
        next();
    }
}

export default registrationMiddleware;