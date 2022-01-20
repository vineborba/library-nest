import * as Joi from 'joi';

export const createAuthorSchema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
});
