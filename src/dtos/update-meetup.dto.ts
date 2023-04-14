import Joi from 'joi';
import {UpdateMeetup} from "../types/UpdateMeetup";

export default (data: UpdateMeetup) => {
    const schema = Joi.object({
        id: Joi.number().min(1).integer().required(),
        topic: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(500).required(),
        keywords: Joi.string().min(2).max(255).required(),
        eventTime: Joi.date().required(),
        eventPlace: Joi.string().min(2).max(255).required(),
        userId: Joi.number().min(1).integer().required(),
    })

    return schema.validate(data);
}