import Joi from "joi";
import { Tokens } from "../types";

const tokensSchema = (data: Tokens) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required(),
    accessToken: Joi.string().required(),
  });
  return schema.validate(data);
}

export { tokensSchema };
