import Joi from 'joi';
import {CreateUser} from "../types/CreateUser";

export default (data: CreateUser) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        // содержит только буквы и цифры, имеет длинну от 3 до 30
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    return schema.validate(data);
}
