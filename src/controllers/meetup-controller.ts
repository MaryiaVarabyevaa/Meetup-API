import meetupService from "../services/meetup-service";
import CreateMeetupDto from "../dtos/create-meetup.dto";

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
            const meetupDto = new CreateMeetupDto(req.body);
            const meetup = await meetupService.addMeetup(meetupDto);
            res.send(meetup);
        } catch (err) {
            console.log(err);
        }
    }

    async updateMeetup(req, res) {
        try {
            const updatedMeetup = await meetupService.updateMeetup(req.body);
            res.send(updatedMeetup);
        } catch (err) {
            console.log(err);
        }
    }
}

export default new MeetupController();