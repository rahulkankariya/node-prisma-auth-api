import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

export const signJwt = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions);

export const verifyJwt = (token: string) =>
  jwt.verify(token, JWT_SECRET) as any;
