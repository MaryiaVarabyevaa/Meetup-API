import MeetupDto from "../dtos/meetup-dto";

const { MeetUp } = require('../models/meetup-model');

class MeetupService {
    async findAllMeetups() {
        try {
            const meetups = await MeetUp.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            return meetups;
        } catch (err) {
            console.log(err);
        }
    }

    async findMeetupById(id: number) {
        try {
            const meetup = await MeetUp.findOne({
                where: {id},
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            if (!meetup) {
                throw new Error('There is no such meetup');
            }
            return meetup;
        } catch (err) {
            console.log(err);
        }
    }

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