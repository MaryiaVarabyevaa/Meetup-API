import Joi from "joi";
import { UserLoginDto } from "../dtos";

const validateLogin = (data: UserLoginDto ) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  });

  return schema.validate(data);
}

export { validateLogin };
