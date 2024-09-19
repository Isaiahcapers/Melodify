// userRoutes.ts
import { Router } from 'express';
const router = Router();
/**
 * GET /users - Fetch all users (dummy route)
 */
router.get('/', (_req, res) => {
    res.json({ users: [{ id: 1, username: 'admin' }] });
});
export { router as usersRouter }; // Exporting the router as usersRouter
