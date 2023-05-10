import { ParamsReport } from "../meetup/types";
import Joi from "joi";

const reportTypeSchema = (data: ParamsReport) => {
  const schema = Joi.object({
    type: Joi.string().valid("pdf", "csv").required(),
  })

  return schema.validate(data);
}

export { reportTypeSchema };