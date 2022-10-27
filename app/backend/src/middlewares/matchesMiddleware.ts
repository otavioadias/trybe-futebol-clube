import { NextFunction, Request, Response } from 'express';

const matchesMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const ERROR_EQUAL_TEAMS = 'It is not possible to create a match with two equal teams';
  if (homeTeam === awayTeam) {
    return res.status(422).json({ message: ERROR_EQUAL_TEAMS });
  }
  next();
};

export default matchesMiddleware;
