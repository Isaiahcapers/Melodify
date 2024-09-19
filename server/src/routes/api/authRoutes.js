import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user'; // Adjust the path as per your folder structure
const router = Router();
/**
 * POST /register - Handle user registration
 */
router.post('/register', async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        // Validate input
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Username, password, and confirm password are required' });
        }
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user in the database
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        const err = error; // Cast error to Error type
        return res.status(500).json({ message: err.message });
    }
});
/**
 * POST /login - Handle user login
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find the user in the database
        const user = await User.findOne({ where: { username } });
        // Check if user exists and password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate a JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });
        return res.status(200).json({ token, message: 'Login successful' });
    }
    catch (error) {
        const err = error; // Cast error to Error type
        return res.status(500).json({ message: err.message });
    }
});
export { router as authRoutes }; // Exporting the router as authRoutes
