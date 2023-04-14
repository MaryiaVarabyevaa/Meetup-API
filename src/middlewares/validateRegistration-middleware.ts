import CreateUserDto from "../dtos/create-user.dto";
import {AuthenticatedRequest} from "../types/AuthenticatedRequest";
import {NextFunction, Response} from "express";

export default (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const { error, value } = CreateUserDto(req.body);
    if (error) {
        res.status(400).json({message: 'One or more fields in the request body are invalid.'});
    } else {
        req.userValidatedData = value;
        next();
    }
}