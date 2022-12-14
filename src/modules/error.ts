import { NextFunction, Request, Response } from 'express';

export const handleError = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'unauthorized' });
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' });
  } else {
    res.status(500).json({ message: 'internal server error' });
  }
};
