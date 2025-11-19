import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: string };
    req.userId = payload.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
};

export type { AuthRequest };
