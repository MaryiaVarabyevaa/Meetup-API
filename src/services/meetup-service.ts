import {CreateMeetup} from "../types/CreateMeetup";
import {UpdateMeetup} from "../types/UpdateMeetup";
import ApiError from "../exceptions/api-error";
import {Op, Sequelize} from "sequelize";
import {MeetUpSearchQuery} from "../types/MeetUpSearchQuery";
import {DeleteMeetupResponse} from "../types/DeleteMeetupResponse";
import {FindAndCountAllResult} from "../types/FindAndCountAllResult";
import {SortOptions} from "../constants/sortOptions";
import {MeetupModelInstance} from "../types/MeetupModelInstance";
import {MigrationMeetupResult} from "../types/MigrationMeetupResult";
import getNowDate from "../utils/getNowDate";
import {ErrorMessages} from "../constants/errorMessages";

const { MeetUp } = require('../models/meetup-model');

class MeetupService {
    async findAllMeetups(queries: MeetUpSearchQuery): Promise<FindAndCountAllResult>  {
        try {
            const { limit = SortOptions.LIMIT, page = SortOptions.PAGE } = queries;
            const offset = page * limit - limit;
            const sort = [];
            const filter = { date: {[Op.gte]: getNowDate()}}
            for (const [key, value] of Object.entries(queries)) {
                if (key.startsWith('sortBy')) {
                    sort.push([`${key.toLowerCase().slice(6)}`, value]);
                }
                if (key.startsWith('filterBy')) {
                    if (key.endsWith('Keywords')) {
                        filter[key.toLowerCase().slice(8)] = {[Op.match]: Sequelize.fn('to_tsquery', value.split(',').join(' | '))};
                    } else {
                        filter[key.toLowerCase().slice(8)] = {[Op.eq]: value};
                    }
                }
            }
            if (sort.length === 0) sort.push(['date', 'ASC'], ['time', 'ASC']);
            const meetups = await MeetUp.findAndCountAll({ where: filter, order: sort, limit, offset }) as FindAndCountAllResult;
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
                throw ApiError.NotFound(ErrorMessages.MEETUP_NOT_FOUNT);
            }
            return meetup as MeetupModelInstance;
        } catch (err) {
            throw err;
        }
    }

    async addMeetup(meetupDto: CreateMeetup, userId: number): Promise<MigrationMeetupResult> {
        try {
            const {  time, date,  place } = meetupDto;
            const meetup = await MeetUp.findOne({where: {place, date, time}});
            if (meetup) {
                throw ApiError.Conflict(ErrorMessages.MEETUP_CONFLICT);
            }
            const newMeetup = await MeetUp.create({...meetupDto, userId}) as MigrationMeetupResult;
            return newMeetup;
        } catch (err) {
            throw err;
        }
    }

    async updateMeetup(meetupDto: UpdateMeetup): Promise<MeetupModelInstance> {
        try {
           const { id, ...rest } = meetupDto;
           const meetup = await MeetUp.findOne({ where: {id} });
           if (!meetup) {
               throw ApiError.NotFound(ErrorMessages.MEETUP_NOT_FOUNT);
           }
           await meetup.update({...rest});
           await meetup.save();
           const updatedInstance = await MeetUp.findByPk(id) as MeetupModelInstance;
           return updatedInstance;
        } catch (err) {
            throw err;
        }
    }

    async deleteMeetup(id: number, userId: number): Promise<DeleteMeetupResponse> {
       try {
           const meetup = await MeetUp.findOne({ where: {id} });
           if (!meetup) {
               throw ApiError.NotFound(ErrorMessages.MEETUP_NOT_FOUNT);
           }
           const { userId: organizerId } = meetup;
           if (organizerId !== userId) {
               throw ApiError.Forbidden(ErrorMessages.USER_FORBIDDEN);
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