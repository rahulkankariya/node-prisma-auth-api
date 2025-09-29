import { Request } from 'express';
import * as authRepo from '../repositories/auth.repo';
import * as bcryptUtil from '../utils/bcrypt';
import * as jwtUtil from '../utils/jwt';
import * as emailUtil from '../utils/email';

export const signup = async (name: string, email: string, password: string, req: Request) => {
  const existingUser = await authRepo.findUserByEmail(email);
  if (existingUser) return { messageKey: 'EMAIL_ALREADY_IN_USE', status: 400 };

  const hashed = await bcryptUtil.hashPassword(password);
  const user = await authRepo.createUser(name, email, hashed);
  const token = jwtUtil.signJwt({ id: user.id });

  return { messageKey: 'SIGNUP_SUCCESS', data: { user, token }, status: 200 };
};

export const login = async (email: string, password: string, req: Request) => {
  const user = await authRepo.findUserByEmail(email);
  if (!user) return { messageKey: 'USER_NOT_FOUND', status: 404 };

  const valid = await bcryptUtil.comparePassword(password, user.password);
  if (!valid) return { messageKey: 'INVALID_CREDENTIALS', status: 400 };

  const token = jwtUtil.signJwt({ id: user.id, email: user.email });
  let data ={
    user,token
  }
  return { messageKey: 'LOGIN_SUCCESS', data:  data , status: 200 };
};

export const requestResetPassword = async (email: string, req: Request) => {
  const user = await authRepo.findUserByEmail(email);
  if (!user) return { messageKey: 'USER_NOT_FOUND', status: 404 };

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  await authRepo.createOTP(user.id, code);
  await emailUtil.sendOTP(email, code);

  return { messageKey: 'OTP_SENT', data: { email }, status: 200 };
};

export const resetPassword = async (email: string, code: string, newPassword: string, req: Request) => {
 
 const userId =  await authRepo.findUserByEmail(email);
  if (!userId) return { messageKey: 'USER_NOT_FOUND', status: 404 };

  const otp = await authRepo.verifyOTP(userId.id, code);
  if (!otp) return { messageKey: 'OTP_INVALID', status: 400 };

  const hashed = await bcryptUtil.hashPassword(newPassword);
  await authRepo.updateUserPassword(userId.id, hashed);

  return { messageKey: 'PASSWORD_RESET_SUCCESS', status: 200 };
};
