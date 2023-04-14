import meetupService from "../services/meetup-service";
import ApiError from "../exceptions/api-error";
import {UserRole} from "../constants/userRoles";

class MeetupController {
    async findAllMeetups(req, res, next) {
        try {
            const meetups = await meetupService.findAllMeetups(req.query);
            return res.status(200).json(meetups);
        } catch (err) {
            next(err);
        }
    }

    async findMeetupById(req, res, next) {
        try {
           const { id } = req.params;
           const meetup = await meetupService.findMeetupById(id);
           res.status(200).json(meetup)
        } catch (err) {
            next(err);
        }
    }

    async addMeetup(req, res, next) {
        try {
            const { role } = req.validatedData;
            if (role === UserRole.USER) {
                throw ApiError.Forbidden();
            }
            const meetup = await meetupService.addMeetup(req.validatedData);
            res.status(201).json(meetup);
        } catch (err) {
            next(err);
        }
    }

    async updateMeetup(req, res, next) {
        try {
            const { role, accessingUserId, userId } = req.validatedData;
            if (role === UserRole.USER && accessingUserId !== userId) {
                throw ApiError.Forbidden();
            }
            const updatedMeetup = await meetupService.updateMeetup(req.validatedData);
            res.status(200).json(updatedMeetup);

        } catch (err) {
            next(err);
        }
    }
    async deleteMeetup(req, res, next) {
        try {
            const { role, id } = req.user;
            if (role === UserRole.USER) {
                throw ApiError.Forbidden();
            }
            const deletedMeetup = await meetupService.deleteMeetup(req.body.id, id);
            res.status(204).json(deletedMeetup);
        } catch (err) {
            next(err);
        }
    }
}

export default new MeetupController();