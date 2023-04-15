import {NextFunction, Response} from "express";
import CreateMeetupDto from "../dtos/create-meetup.dto";
import {AuthenticatedRequest} from "../types/AuthenticatedRequest";


export default (req:AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const { error, value } = CreateMeetupDto(req.body);
    if (error) {
        res.status(400).json({message: error});
    } else {
        req.validatedData = {...value};
        next();
    }
}