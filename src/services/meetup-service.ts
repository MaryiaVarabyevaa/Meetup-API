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
import Meetup from "../routes/meetup";

const { MeetUp } = require('../models/meetup-model');

class MeetupService {
    async findAllMeetups(queries: MeetUpSearchQuery): Promise<FindAndCountAllResult>  {
        try {
            let {
                keywords,
                limit = SortOptions.LIMIT,
                page = SortOptions.PAGE,
                sortByDate,
                sortByTopic,
            } = queries;
            const offset = page * limit - limit;
            // const searchKeywords = keywords!.split(',').join(' | ');
            let meetups;

            const sortingConditions = [];
            if (sortByDate) {
                sortingConditions.push(['event_time', sortByDate]);
            }
            if (sortByTopic) {
                sortingConditions.push(['topic', sortByTopic]);
            }

            if (sortingConditions.length === 0) {
                sortingConditions.push(['event_time', 'ASC']);
            }


            meetups = await MeetUp.findAndCountAll({
                where: {
                    [Op.and]: [
                        {event_time: {[Op.gte]: getNowDateTime()}},
                        // {keywords: {
                        //         [Op.match]: Sequelize.fn('to_tsquery', searchKeywords),
                        // }}
                    ]
                },
                order: [
                    sortingConditions.map(condition => [Sequelize.col(condition[0]), condition[1]])
                ],
                // limit,
                // offset
            });
            // if (searchKeywords) {
            //     meetups = await MeetUp.findAndCountAll({
            //         where: {
            //             [Op.and]: [
            //                 {event_time: {[Op.gte]: getNowDateTime()}},
            //                 { keywords: {
            //                         [Op.match]: Sequelize.fn('to_tsquery', searchKeywords),
            //                     },
            //                 }
            //             ]
            //         },
            //         limit,
            //         offset,
            //     });
            // }
            console.log(meetups)
            // if (!keywords) {
            //     meetups = await MeetUp.findAndCountAll({
            //         // where: {
            //         //     event_time: {[Op.gte]: getNowDateTime()}
            //         // },
            //         where: {
            //             [Op.and]: [
            //                 { title: { [Op.like]: '%example%' } },
            //                 { author: { [Op.like]: '%john%' } },
            //                 { createdAt: { [Op.gte]: new Date('2022-01-01') } }
            //             ]
            //         },
            //         limit,
            //         offset,
            //         // order: [['event_time', sortValue]],
            //     });
            // }
            // else {
            //     const searchKeywords = keywords.split(',').join(' | ');
            //     meetups = await MeetUp.findAndCountAll({
            //         where: {
            //             keywords: {
            //                 [Op.match]: Sequelize.fn('to_tsquery', searchKeywords),
            //             },
            //             event_time: {[Op.gte]: getNowDateTime()}
            //         },
            //         limit,
            //         offset,
            //         // order: ['event_time', sortValue],
            //     })
            // }
            return meetups;
        } catch (err) {
           throw err;
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
            throw err;
        }
    }

    async addMeetup(meetupDto: CreateMeetup, userId: number): Promise<MigrationMeetupResult> {
        try {
            const {  time, date,  eventPlace, topic, description, keywords } = meetupDto;
            const value = { time, date, event_place: eventPlace, userId, topic, description, keywords };
            const meetup = await MeetUp.findOne({where: {event_place: eventPlace, date, time}});
            if (meetup) {
                throw ApiError.Conflict();
            }
            const newMeetup = await MeetUp.create({...value}) as MigrationMeetupResult;
            return newMeetup;
        } catch (err) {
            throw err;
        }
    }

    async updateMeetup(meetupDto: UpdateMeetup): Promise<MeetupModelInstance> {
        try {
           const { eventPlace, id, ...rest } = meetupDto;
           const meetup = await MeetUp.findOne({ where: {id} });
           if (!meetup) {
               throw ApiError.NotFound();
           }
           await meetup.update({...rest, event_place: eventPlace});
           await meetup.save();
           const updatedInstance = await MeetUp.findByPk(id) as UpdateMeetup;
           return updatedInstance;
        } catch (err) {
            throw err;
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
           throw err;
       }
    }

}

export default new MeetupService();