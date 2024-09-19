import { Router } from 'express';
//import { loginRouter } from './authRoutes.js';
import { authRoutes } from './authRoutes.js'; // Importing authRoutes
const router = Router();
router.use('/auth', authRoutes); // Mounting the login router on the /api path
export default router;
