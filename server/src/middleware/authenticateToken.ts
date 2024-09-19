import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  // Use return inside the jwt.verify callback to ensure all code paths return a value
  return jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Attach the user to the request object and proceed to next middleware
    (req as any).user = user;

    // Explicitly return next() to avoid the error
    return next();  // Pass control to the next middleware
  });
};
