import Joi from "joi";

const validateGoogle = (data: {}) => {
  const schema = Joi.object({});
  return schema.validate(data);
}

export { validateGoogle };
