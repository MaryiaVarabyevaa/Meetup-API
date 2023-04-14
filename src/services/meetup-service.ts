import {CreateMeetup} from "../types/CreateMeetup";
import {UpdateMeetup} from "../types/UpdateMeetup";
import ApiError from "../exceptions/api-error";
import {Op, Sequelize} from "sequelize";
import {MeetUpSearchQuery} from "../types/MeetUpSearchQuery";
import getNowDateTime from "../utils/getNowDateTime";
import {DeleteMeetupResponse} from "../types/DeleteMeetupResponse";
import {FindAndCountAllResult} from "../types/FindAndCountAllResult";
import {SortOptions} from "../constants/sortOptions";
import {MeetupModelInstance} from "../types/MeetupModelInstance";
import {MigrationMeetupResult} from "../types/MigrationMeetupResult";

const { MeetUp } = require('../models/meetup-model');

class MeetupService {
    async findAllMeetups(queries: MeetUpSearchQuery): Promise<FindAndCountAllResult>  {
        try {
            let {
                keywords,
                limit = SortOptions.LIMIT,
                page = SortOptions.PAGE,
                sortValue = SortOptions.SORT
            } = queries;
            const offset = page * limit - limit;
            let meetups;
            if (!keywords) {
                // findAndCountAll используется для подсчета страниц на фронте
                // возвращает общее количество товаров по заданному запросу
                meetups = await MeetUp.findAndCountAll({
                    where: {
                        event_time: {[Op.gte]: getNowDateTime()}
                    },
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
                    limit,
                    offset,
                    // order: ['event_time', sortValue],
                })
            }
            return meetups;
        } catch (err) {
            console.log(err);
        }
    }

    async findMeetupById(id: number):Promise<MeetupModelInstance> {
        try {
            const meetup = await MeetUp.findOne({
                where: {id},
            });
            if (!meetup) {
                throw ApiError.NotFound();
            }
            return meetup as MeetupModelInstance;
        } catch (err) {
            console.log(err);
        }
    }

    async addMeetup(meetupDto: CreateMeetup): Promise<MigrationMeetupResult> {
        try {
            const {  eventTime,  eventPlace, userId, role, ...rest } = meetupDto;
            const value = { ...rest, event_time: eventTime, event_place: eventPlace, userId };
            const meetup = await MeetUp.findOne({
                where: {...value}
            });

            if (meetup) {
                throw ApiError.Conflict();
            }

            const newMeetup = await MeetUp.create({...value}) as MigrationMeetupResult;
            return newMeetup;
        } catch (err) {
            console.log(err);
        }
    }

    async updateMeetup(meetupDto: UpdateMeetup): Promise<MeetupModelInstance> {
        try {
           const { eventTime,  eventPlace, id, accessingUserId,...rest } = meetupDto;
           const meetup = await MeetUp.findOne({ where: {id} });

           if (!meetup) {
               throw ApiError.NotFound();
           }

           await meetup.update({...rest, event_time: eventTime, event_place: eventPlace});
           await meetup.save();
            const updatedInstance = await MeetUp.findByPk(id) as UpdateMeetup;
            return updatedInstance;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteMeetup(id: number, userId: number): Promise<DeleteMeetupResponse> {
        try {
            const meetup = await MeetUp.findOne({ where: {id} });
            if (!meetup) {
                throw ApiError.NotFound();
            }
            const { userId: organizerId } = meetup;
            if (organizerId !== userId) {
                throw ApiError.Forbidden();
            }
            await MeetUp.destroy({
                where: { id }
            });
            return { success: true };
        } catch (err) {
            console.log(err);
        }
    }

}

export default new MeetupService();