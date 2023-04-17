import {NextFunction, Request, Response} from 'express';
import meetupService from "../services/meetup-service";
import ApiError from "../exceptions/api-error";
import {UserRole} from "../constants/userRoles";
import {CreateMeetup} from "../types/CreateMeetup";
import {MeetUpSearchQuery} from "../types/MeetUpSearchQuery";
import {UpdateMeetup} from "../types/UpdateMeetup";
import {ErrorMessages} from "../constants/errorMessages";

class MeetupController {
    async findAllMeetups(req: Request, res: Response, next: NextFunction): Promise<Response | void>   {
        try {
            const meetups = await meetupService.findAllMeetups(req.query as MeetUpSearchQuery);
            return res.status(200).json(meetups);
        } catch (err) {
            next(err);
            return;
        }
    }

    async findMeetupById(req: Request, res: Response, next: NextFunction): Promise<Response | void>   {
        try {
           const { id } = req.params;
           const meetup = await meetupService.findMeetupById(+id);
           return res.status(200).json(meetup)
        } catch (err) {
            next(err);
            return;
        }
    }

    async addMeetup(req: Request, res: Response, next: NextFunction): Promise<Response | void>   {
        try {
            const { role, id } = req.user;
            if (role === UserRole.USER) {
                throw ApiError.Forbidden(ErrorMessages.USER_FORBIDDEN);
            }
            const meetup = await meetupService.addMeetup(req.validatedData as CreateMeetup, id);
            return res.status(201).json(meetup);
        } catch (err) {
            next(err);
            return;
        }
    }

    async updateMeetup(req: Request, res: Response, next: NextFunction): Promise<Response | void>   {
        try {
            const { role, id } = req.user;
            const { userId } = req.validatedData as UpdateMeetup;
            if (role === UserRole.USER && userId !== id) {
                throw ApiError.Forbidden(ErrorMessages.USER_FORBIDDEN);
            }
            const updatedMeetup = await meetupService.updateMeetup(req.validatedData as UpdateMeetup);
            return res.status(200).json(updatedMeetup);
        } catch (err) {
            next(err);
            return;
        }
    }

    async deleteMeetup(req: Request, res: Response, next: NextFunction): Promise<Response | void>   {
        try {
            const { role, id } = req.user;
            if (role === UserRole.USER) {
                throw ApiError.Forbidden(ErrorMessages.USER_FORBIDDEN);
            }
            const deletedMeetup = await meetupService.deleteMeetup(+req.params.id, id);
            return res.status(204).json(deletedMeetup);
        } catch (err) {
            next(err);
            return;
        }
    }
}

export default new MeetupController();