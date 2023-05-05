import Joi from 'joi';
import { UserDto } from "../dtos";

const validateRegistration = (data: UserDto ) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  });

  return schema.validate(data);
}

export { validateRegistration };

