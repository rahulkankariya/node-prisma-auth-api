import Joi from 'joi';

export const signupSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'name_required',
    'string.empty': 'name_required',
    'any.required': 'name_required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'email_invalid',
    'any.required': 'email_required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'password_min',
    'any.required': 'password_required'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'email_invalid',
    'any.required': 'email_required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'password_required'
  })
});

export const requestOtpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'EMAIL_REQUIRED',
    'any.required': 'EMAIL_REQUIRED'
  }),
  type: Joi.string().valid('RESET_PASSWORD', 'VERIFY_EMAIL').default('RESET_PASSWORD')
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'email_invalid',
    'any.required': 'email_required'
  }),
  type: Joi.string().valid('RESET_PASSWORD', 'VERIFY_EMAIL').default('RESET_PASSWORD'),
  code: Joi.string().required().messages({
    'any.required': 'otp_code_required'
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'password_min',
    'any.required': 'new_password_required'
  })
});
