
import { Request, Response, NextFunction } from 'express';


declare module 'express-serve-static-core' {
  interface Request {
    lang?: string;
  }
}

export const languageMiddleware = (req: Request, res: Response, next: NextFunction) => {
 
  req.lang = req.headers['accept-language'] as string || 'en';
  next();
};
