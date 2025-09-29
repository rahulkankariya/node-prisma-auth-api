import Joi from 'joi';

export const editProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional()
  // avatar handled via multipart
});
