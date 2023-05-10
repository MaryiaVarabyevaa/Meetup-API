import Joi from "joi";
import { ParamsId } from "../meetup/types";


const idSchema = (data: ParamsId) => {
  const schema = Joi.object({
    id: Joi.number().min(1).integer().required(),
  })

  return schema.validate(data);
}

export { idSchema };