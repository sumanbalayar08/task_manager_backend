import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller';
import RequestValidator from '../utils/validators.utils';
import { RegisterDTO, LoginDTO } from '../dto/auth.dto';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', RequestValidator.validate(RegisterDTO), register);
router.post('/login', RequestValidator.validate(LoginDTO), login);
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

export default router;  