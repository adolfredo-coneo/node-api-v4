import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret',
    { expiresIn: '1h' }
  );
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(403).json({ message: 'No authorization' });
  }

  const token = bearer.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret'
    );
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'No valid token' });
  }
};
