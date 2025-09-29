import { Request, Response, NextFunction } from 'express';
import { getProfile, editProfile } from '../services/userService';
import { editProfileSchema } from '../validators/user.validator';
import { sendResponse } from '../utils/responseHandler';
import { t } from '../utils/i18n';

export const getProfileHandler = async (req: Request, res: Response, next: NextFunction) => {
  const lang = (req as any).lang || 'en';
  try {
    const userId = Number((req as any).user.id);
    const user = await getProfile(userId);

    return sendResponse({
      res,
      status: 200,
      messageKey: 'PROFILE_FETCHED',
      data: { user },
      req,
    });
  } catch (e) {
    next(e);
  }
};

export const editProfileHandler = async (req: Request, res: Response, next: NextFunction) => {
  const lang = (req as any).lang || 'en';
  try {
    const { error, value } = editProfileSchema.validate(req.body);
    if (error) {
      return sendResponse({
        res,
        status: 400,
        messageKey: error.message,
        req,
      });
    }
    // token value get
    const userId = Number((req as any).user.id);

    const avatar = (req as any).file ? `/uploads/${(req as any).file.filename}` : undefined;
    const data: any = {};
    if (value.name) data.name = value.name;
    if (avatar) data.avatar = avatar;
    
    const user = await editProfile(userId, data);

    return sendResponse({
      res,
      status: 200,
      messageKey: t('PROFILE_UPDATED', lang),
      data: { user },
      req,
    });
  } catch (e) {
    console.log(e)
    next(e);
  }
};
