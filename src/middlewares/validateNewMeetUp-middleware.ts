import {NextFunction, RequestHandler, Response, Request} from "express";
import CreateMeetupDto from "../dtos/create-meetup.dto";


const validateNewMeetUpMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = CreateMeetupDto(req.body);
    if (error) {
        res.status(400).json({message: error});
    } else {
        req.validatedData = {...value};
        next();
    }
}

export default validateNewMeetUpMiddleware;