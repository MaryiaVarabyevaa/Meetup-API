import Joi from 'joi';
import {CreateMeetup} from "../types/CreateMeetup";

export default (data: CreateMeetup) => {
    const schema = Joi.object({
        topic: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(500).required(),
        keywords: Joi.string().min(2).max(255).required(),
        eventTime: Joi.date().required(),
        eventPlace: Joi.string().min(2).max(255).required(),
    })

    return schema.validate(data);
}
