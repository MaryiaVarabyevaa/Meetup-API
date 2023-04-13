import meetupService from "../services/meetup-service";
import UpdateMeetupDto from "../dtos/update-meetup.dto";
import ApiError from "../exceptions/api-error";
import {UserRole} from "../constants/userRoles";

class MeetupController {
    async findAllMeetups(req, res) {
        try {
            const meetups = await meetupService.findAllMeetups();
            res.send(meetups);
        } catch (err) {
            console.log(err);
        }
    }

    async findMeetupById(req, res) {
        try {
           const { id } = req.params;
           const meetup = await meetupService.findMeetupById(id);
           res.send(meetup)
        } catch (err) {
            console.log(err);
        }
    }

    async addMeetup(req, res) {
        try {
            const { role } = req.validatedData;
            if (role === UserRole.USER) {
                throw ApiError.Forbidden();
            }
            const meetup = await meetupService.addMeetup(req.validatedData);
            res.send(meetup);
        } catch (err) {
            console.log(err);
        }
    }

    async updateMeetup(req, res) {
        try {
            const { error, value } = UpdateMeetupDto(req.validatedData);
            if (error) {
                res.status(400).json({message: "Error"})
            } else {
                const updatedMeetup = await meetupService.updateMeetup(value);
                res.send(updatedMeetup);
            }
        } catch (err) {
            console.log(err);
        }
    }
    async deleteMeetup(req, res) {
        try {
            const deletedMeetup = await meetupService.deleteMeetup(req.body.id);
            res.send('GOOD')
            // res.status(204).sendStatus('204 No Content').toString();
        } catch (err) {
            console.log(err);
        }
    }
}

export default new MeetupController();