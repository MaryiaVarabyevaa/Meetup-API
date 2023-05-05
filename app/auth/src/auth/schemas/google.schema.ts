import Joi from "joi";

const googleSchema = (data: {}) => {
  const schema = Joi.object({});
  return schema.validate(data);
}

export { googleSchema };
