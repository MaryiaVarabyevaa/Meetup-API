import {NextFunction, Request, RequestHandler, Response} from 'express';
import UpdateMeetupDto from "../dtos/update-meetup.dto";
import {UpdateMeetup} from "../types/UpdateMeetup";

const validateMeetupUpdateMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = UpdateMeetupDto(req.body as UpdateMeetup);
    if (error) {
        res.status(400).json({ message: 'One or more fields in the request body are invalid.' });
    } else {
        req['validatedData'] = { ...value };
        next();
    }
};

export default validateMeetupUpdateMiddleware;