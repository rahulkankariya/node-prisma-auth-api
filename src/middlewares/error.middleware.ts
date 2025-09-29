import { Request, Response, NextFunction } from 'express';
import { t } from '../utils/i18n';

export class ApiError extends Error {
  status: number;
  details?: any;
  constructor(status: number, message: string, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const lang = (req as any).lang || 'en';
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: t(err.message, lang), details: err.details || null });
  }

  console.error(err);
  res.status(500).json({ message: t('UNAUTHORIZED', lang) });
};

