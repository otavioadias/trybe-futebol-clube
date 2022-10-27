import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const matchesService = new MatchesService();

const invalidTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  const INVALID_TOKEN = 'Token must be a valid token';
  const result = await matchesService.validateUser(token);
  console.log(result);
  if (!result) {
    return res.status(401).json({ message: INVALID_TOKEN });
  }
  next();
};

export default invalidTokenMiddleware;
