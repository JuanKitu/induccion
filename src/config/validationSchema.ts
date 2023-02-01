import * as Joi from 'joi';
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  CORS_ENABLED: Joi.boolean().required(),
  SWAGGER_ENABLED: Joi.boolean().required(),
});
