import Joi from 'joi';
import {UpdateMeetup} from "../types/UpdateMeetup";

export default (data: UpdateMeetup) => {
    const schema = Joi.object({
        id: Joi.number().min(1).integer().required(),
        topic: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(500).required(),
        keywords: Joi.string().min(2).max(255).required(),
        time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
        date: Joi.date().greater(Joi.ref('now')).required(),
        eventPlace: Joi.string().min(2).max(255).required(),
        userId: Joi.number().min(1).integer().required(),
    })

    return schema.validate(data);
}