import Joi from 'joi';
import {UpdateMeetup} from "../types/UpdateMeetup";
import {ErrorMessages} from "../constants/errorMessages";


export default (data: UpdateMeetup) => {
    const schema = Joi.object({
        id: Joi.number().min(1).integer().required(),
        topic: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(500).required(),
        keywords: Joi.string().min(2).max(255).required(),
        time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
        date: Joi.string()
            .pattern(/^\d{4}-\d{2}-\d{2}$/)
            .custom((value, helpers) => {
                const currentDate = new Date().toISOString().substring(0, 10);
                if (value < currentDate) {
                    return helpers.message(ErrorMessages.VALIDATION_DATE_ERROR);
                }
                return value;
            })
            .required(),
        place: Joi.string().min(2).max(255).required(),
        userId: Joi.number().min(1).integer().required(),
    })

    return schema.validate(data);
}