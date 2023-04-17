import Joi from 'joi';
import {CreateMeetup} from "../types/CreateMeetup";
import {ErrorMessages} from "../constants/errorMessages";


export default (data: CreateMeetup) => {
    const schema = Joi.object({
        topic: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(500).required(),
        keywords: Joi.string().min(2).max(255).required(),
        time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
        date: Joi.string()
            .pattern(/^\d{4}-\d{2}-\d{2}$/)
            .custom((value, helpers) => {
                const currentDate = new Date().toISOString().substring(0, 10);
                if (value < currentDate) {
                    return helpers.message({ 'custom.VALIDATION_DATE_ERROR': ErrorMessages.VALIDATION_DATE_ERROR });
                }
                return value;
            })
            .required(),
        place: Joi.string().min(2).max(255).required(),
    })

    return schema.validate(data);
}
