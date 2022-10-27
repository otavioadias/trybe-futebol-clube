import { NextFunction, Request, Response } from 'express';

const matchesMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const errorEqualTeams = 'It is not possible to create a match with two equal teams';
  console.log(errorEqualTeams);
  if (homeTeam === awayTeam) {
    return res.status(422).json({ message: errorEqualTeams });
  }
  next();
};

export default matchesMiddleware;
