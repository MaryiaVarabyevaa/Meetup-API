import Joi from "joi";
import { TokenPayload } from "../utils/jwtUtils";

const googleCallbackSchema = (data: TokenPayload) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
}

export { googleCallbackSchema };