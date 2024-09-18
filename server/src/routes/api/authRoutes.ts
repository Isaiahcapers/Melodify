import { Router } from 'express';

const router = Router();

// Dummy user data, in real scenario fetch from database
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'password' // Plain text, but should be hashed in production
  }
];

/**
 * POST /login - Handle user login
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(u => u.username === username);

  // If user not found or password does not match, send an error
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }

  // If credentials are valid, return success response
  return res.json({ success: true, message: 'Login successful', userId: user.id });
});

export default router;
