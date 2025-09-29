import { Request, Response, NextFunction } from 'express';

export const i18nMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const lang = (req.header('Accept-Language') || req.query.lang || 'en').toString().split(',')[0];
  // attach to req
  (req as any).lang = lang;
  next();
};
