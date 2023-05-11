import Joi from 'joi';
import { ParamsReport } from '../types';

const reportTypeSchema = (data: ParamsReport) => {
  const schema = Joi.object({
    type: Joi.string().valid('pdf', 'csv').required()
  });

  return schema.validate(data);
};

export { reportTypeSchema };
