import { Request, Response, NextFunction } from 'express';
import meetupService from "../services/meetup-service";
import ApiError from "../exceptions/api-error";
import {UserRole} from "../constants/userRoles";
import {NextFunction} from "express";
import {AuthenticatedRequest} from "../types/AuthenticatedRequest";
import {CreateMeetup} from "../types/CreateMeetup";
import {MeetUpSearchQuery} from "../types/MeetUpSearchQuery";
import {UpdateMeetup} from "../types/UpdateMeetup";

class MeetupController {
    async findAllMeetups(req: Request, res: Response, next: NextFunction): Promise<Response>   {
        try {
            const meetups = await meetupService.findAllMeetups(req.query as MeetUpSearchQuery);
            return res.status(200).json(meetups);
        } catch (err) {
            next(err);
        }
    }

    async findMeetupById(req: Request, res: Response, next: NextFunction): Promise<Response>   {
        try {
           const { id } = req.params;
           const meetup = await meetupService.findMeetupById(+id);
           return res.status(200).json(meetup)
        } catch (err) {
            next(err);
        }
    }

    async addMeetup(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response>   {
        try {
            const { role, id } = req.user;
            if (role === UserRole.USER) {
                throw ApiError.Forbidden();
            }
            const meetup = await meetupService.addMeetup(req.validatedData as CreateMeetup, id);
            return res.status(201).json(meetup);
        } catch (err) {
            next(err);
        }
    }

    async updateMeetup(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response>   {
        try {
            const { role, accessingUserId, userId } = req.user;
            if (role === UserRole.USER && accessingUserId !== userId) {
                throw ApiError.Forbidden();
            }
            const updatedMeetup = await meetupService.updateMeetup(req.validatedData as UpdateMeetup);
            return res.status(200).json(updatedMeetup);

        } catch (err) {
            next(err);
        }
    }

    async deleteMeetup(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response>   {
        try {
            const { role, id } = req.user;
            if (role === UserRole.USER) {
                throw ApiError.Forbidden();
            }
            const deletedMeetup = await meetupService.deleteMeetup(req.body.id, id);
            return res.status(204).json(deletedMeetup);
        } catch (err) {
            next(err);
        }
    }
}

export default new MeetupController();