import { Router } from 'express';

const router = Router();

/**
 * GET /users - Fetch all users (dummy route)
 */
router.get('/', (req, res) => {
  res.json({ users: [{ id: 1, username: 'admin' }] });
});

export default router;
