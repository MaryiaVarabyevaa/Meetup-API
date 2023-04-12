import {CreateMeetup} from "../types/CreateMeetup";
import {UpdateMeetup} from "../types/UpdateMeetup";

const { MeetUp } = require('../models/meetup-model');

class MeetupService {
    async findAllMeetups() {
        try {
            const meetups = await MeetUp.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
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

    async addMeetup(meetupDto: CreateMeetup) {
        try {
            const {  eventTime,  eventPlace, ...rest } = meetupDto;
            const value = { ...rest, event_time: eventTime, event_place: eventPlace };
            const meetup = await MeetUp.findOne({
                where: {...value}
            });

            if (meetup) {
                throw new Error('Such a meetup already exists')
            }

            const newMeetup = await MeetUp.create({...value})
            return  newMeetup;
        } catch (err) {
            console.log(err);
        }
    }

    async updateMeetup(meetupDto: UpdateMeetup) {
        try {
           const {id, ...rest} = meetupDto;
           const meetup = await MeetUp.findOne({ where: {id} });

           if (!meetup) {
               throw new Error('There is no such event');
           }

           const updatedMeetup = await MeetUp.update({...rest}, { where: { id } });
           return updatedMeetup;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteMeetup(id: number) {
        try {
            const meetup = await MeetUp.findOne({ where: {id} });

            if (!meetup) {
                throw new Error('There is no such event');
            }

            const deletedFilm = await MeetUp.destroy({
                where: { id }
            });

            return deletedFilm;
        } catch (err) {
            console.log(err);
        }
    }

}

export default new MeetupService();