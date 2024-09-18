import { Router } from 'express';
import { loginRouter } from './authRoutes.js';

const router = Router();

router.use('/auth', loginRouter); // Mounting the login router on the /api path

export default router;
