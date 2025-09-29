import { Request, Response } from 'express';
import * as authService from '../services/authservice';
import { signupSchema, loginSchema, requestOtpSchema, resetPasswordSchema } from '../validators/auth.validator';
import { sendResponse } from '../utils/responseHandler';

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) return sendResponse({ res, messageKey: error.message, status: 400, req });

    const { name, email, password } = req.body;
    const result = await authService.signup(name, email, password, req);

    return sendResponse({
      res,
      messageKey: result.messageKey,
      data: result.data,
      status: result.status,
      req,
    });
  } catch (err: any) {
    return sendResponse({ res, messageKey: err.message, status: 500, req });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return sendResponse({ res, messageKey: error.message, status: 400, req });

    const { email, password } = req.body;
    const result = await authService.login(email, password, req);

    return sendResponse({
      res,
      messageKey: result.messageKey,
      data: result.data,
      status: result.status,
      req,
    });
  } catch (err: any) {
    return sendResponse({ res, messageKey: err.message, status: 500, req });
  }
};

export const requestOtpHandler = async (req: Request, res: Response) => {
  try {
    const { error } = requestOtpSchema.validate(req.body);
    console.log(error);
    if (error) 
      return sendResponse({ res, messageKey: error.message, status: 400, req });

    const { email } = req.body;
    const result = await authService.requestResetPassword(email, req);

    return sendResponse({
      res,
      messageKey: result.messageKey,
      data: result.data,
      status: result.status,
      req,
    });
  } catch (err: any) {
    return sendResponse({ res, messageKey: err.message, status: 500, req });
  }
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  try {
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) return sendResponse({ res, messageKey: error.message, status: 400, req });

    const { email, code, newPassword } = req.body;
    const result = await authService.resetPassword(email, code, newPassword, req);

    return sendResponse({
      res,
      messageKey: result.messageKey,
      status: result.status,
      req,
    });
  } catch (err: any) {
    return sendResponse({ res, messageKey: err.message, status: 500, req });
  }
};
