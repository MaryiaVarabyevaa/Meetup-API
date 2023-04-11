import MeetupDto from "../dtos/meetup-dto";

const { MeetUp } = require('../models/meetup-model');

class MeetupService {
    // async getAllMeetups() {
    //     try {
    //         return 'Everything is working!';
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    async addMeetup(meetupDto: MeetupDto) {
        try {
            const meetup = await MeetUp.findOne({
                where: {...meetupDto}
            });

            if (meetup) {
                throw new Error('Such a meetup already exists')
            }

            const newMeetup = await MeetUp.create({...meetupDto})
            return  newMeetup;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new MeetupService();