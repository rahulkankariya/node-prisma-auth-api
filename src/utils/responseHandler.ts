// utils/responseHandler.ts
import { Response } from 'express';
import { t } from '../utils/i18n';

type ResponseOptions = {
  res: Response;
  messageKey?: string; 
  errorKey?: string;   
  data?: any;
  status?: number;    
  req?: any;           
};

export const sendResponse = ({ res, messageKey, errorKey, data, status, req }: ResponseOptions) => {
 
  const code = status || (errorKey ? 400 : 200);


  const message = messageKey ? t(messageKey, {}, req?.query?.lang) : null;
  const error = errorKey ? t(errorKey, {}, req?.query?.lang) : null;

  return res.status(code).json({
    status: code,
    message,
    data: data || null,
    // error,
  });
};
