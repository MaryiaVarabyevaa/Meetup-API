import { Response, NextFunction } from 'express';
import UpdateMeetupDto from "../dtos/update-meetup.dto";
import {AuthenticatedRequest} from "../types/AuthenticatedRequest";

export default (req:AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const { error, value } = UpdateMeetupDto(req.body);
    if (error) {
        res.status(400).json({message: 'One or more fields in the request body are invalid.'});
    } else {
        const { id, role } = req.user;
        req.validatedData = {...value, accessingUserId: id, role};
        next();
    }
}