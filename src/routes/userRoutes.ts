import { Router } from 'express';
import { getProfileHandler, editProfileHandler } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.get('/me', authMiddleware, getProfileHandler);
router.put('/me', authMiddleware, upload.single('avatar'), editProfileHandler);

export default router;
