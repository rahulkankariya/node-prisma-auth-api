import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { sendResponse } from '../utils/responseHandler';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header('Authorization');

  if (!header || !header.startsWith('Bearer ')) {
    return sendResponse({
      res,
      status: 401,
      messageKey: 'UNAUTHORIZED',
      req,
    });
  }

  const token = header.replace('Bearer ', '');

  try {
    const payload = verifyJwt(token);
    (req as any).user = payload;
    next();
  } catch (e) {
    return sendResponse({
      res,
      status: 401,
      messageKey: 'UNAUTHORIZED',
      req,
    });
  }
};
