import { Router } from 'express';
import { signupHandler, loginHandler, requestOtpHandler, resetPasswordHandler } from '../controllers/authController';

const router = Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.post('/request-otp', requestOtpHandler);
router.post('/reset-password', resetPasswordHandler);

export default router;
