import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  // NODE_ENV: Joi.string().required(),

  PORT: Joi.number().required(),

  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});
