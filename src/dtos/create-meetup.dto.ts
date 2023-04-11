import Joi from 'joi';

export default (data) => {
    const schema = Joi.object({
        topic: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(500).required(),
        keywords: Joi.string().min(2).max(255).required(),
        event_time: Joi.date().required(),
        event_place: Joi.string().min(2).max(255).required(),
    })

    return schema.validate(data);
}
