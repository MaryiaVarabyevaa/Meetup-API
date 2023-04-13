import {CreateMeetup} from "../types/CreateMeetup";
import {UpdateMeetup} from "../types/UpdateMeetup";
import ApiError from "../exceptions/api-error";
import {Op, Sequelize} from "sequelize";
import {MeetUpSearchQuery} from "../types/MeetUpSearchQuery";
import getNowDateTime from "../utils/getNowDateTime";

const { MeetUp } = require('../models/meetup-model');

class MeetupService {
    async findAllMeetups(queries: MeetUpSearchQuery) {
        try {
            let {keywords, limit, page, sortValue} = queries;
            page = page || 1;
            limit = limit || 2;
            let offset = page * limit - limit;
            sortValue = sortValue || 'ASC'
            let meetups;
            if (!keywords) {
                // findAndCountAll используется для подсчета страниц на фронте
                // возвращает общее количество товаров по заданному запросу
                meetups = await MeetUp.findAndCountAll({
                    where: {
                        event_time: {[Op.gte]: getNowDateTime()}
                    },
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    limit,
                    offset,
                    order: [['event_time', sortValue]],
                });
            } else {
                const searchKeywords = keywords.split(',').join(' | ');
                meetups = await MeetUp.findAndCountAll({
                    where: {
                        keywords: {
                            [Op.match]: Sequelize.fn('to_tsquery', searchKeywords),
                        },
                        event_time: {[Op.gte]: getNowDateTime()}
                    },
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    limit,
                    offset,
                    order: ['event_time', sortValue],
                })
            }
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
            const {  eventTime,  eventPlace, userId, role, ...rest } = meetupDto;
            const value = { ...rest, event_time: eventTime, event_place: eventPlace, userId };
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
           const { eventTime,  eventPlace, id, accessingUserId,...rest } = meetupDto;
           const meetup = await MeetUp.findOne({ where: {id} });

           if (!meetup) {
               throw new Error('There is no such event');
           }

           const updatedMeetup = await MeetUp.update({...rest, event_time: eventTime, event_place: eventPlace}, { where: { id } });
           return updatedMeetup;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteMeetup(id: number, userId: number) {
        try {
            const meetup = await MeetUp.findOne({ where: {id} });
            if (!meetup) {
                throw new Error('There is no such event');
            }
            if (meetup.userId !== userId) {
                throw ApiError.Forbidden();
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