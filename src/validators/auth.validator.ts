import Joi from 'joi';

export const signupSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'NAME_REQUIRED',
    'string.empty': 'NAME_REQUIRED',
    'any.required': 'NAME_REQUIRED'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'EMAIL_INVALID',
    'any.required': 'EMAIL_INVALID'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'PASSWORD_MIN',
    'any.required': 'PASSWORD_REQUIRED'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'EMAIL_INVALID',
    'any.required': 'EMAIL_REQUIRED'
  }),
  password: Joi.string().required().messages({
    'any.required': 'PASSWORD_REQUIRED'
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
    'string.email': 'EMAIL_INVALID',
    'any.required': 'EMAIL_REQUIRED'
  }),
  type: Joi.string().valid('RESET_PASSWORD', 'VERIFY_EMAIL').default('RESET_PASSWORD'),
  code: Joi.string().required().messages({
    'any.required': 'OTP_CODE_REQUIRED'
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'PASSWORD_MIN',
    'any.required': 'NEW_PASSWORD_REQUIRED'
  })
});
