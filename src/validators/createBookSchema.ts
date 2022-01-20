import * as Joi from 'joi';
import { createAuthorSchema } from './createAuthorSchema';

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.alternatives(
    Joi.string(),
    Joi.number().positive(),
    createAuthorSchema,
  ),
  description: Joi.string(),
  publishedAt: Joi.date(),
  categories: Joi.array().items(Joi.string()),
});
