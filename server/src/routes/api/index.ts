import { Router } from 'express';

const router = Router();

import {userRouter } from './userRoutes.js';

router.use('/users', userRouter);
// router.use('/placeholder', ...);

export default router;
