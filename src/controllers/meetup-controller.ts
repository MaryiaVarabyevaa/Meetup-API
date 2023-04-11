import meetupService from "../services/meetup-service";
import MeetupDto from "../dtos/meetup-dto";

class MeetupController {
    // async getAllMeetups(req, res) {
    //     try {
    //         const meetups = await meetupService.getAllMeetups();
    //         res.send(meetups);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    async addMeetup(req, res) {
        try {
            const meetupDto = new MeetupDto(req.body);
            const meetup = await meetupService.addMeetup(meetupDto);
            res.send(meetup);
        } catch (err) {
            console.log(err);
        }
    }
}

export default new MeetupController();