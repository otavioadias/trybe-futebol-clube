import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

const teamService = new TeamsService();

const matchesMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const UNKNOWN_TEAM = 'There is no team with such id!';
  const home = await teamService.getTeamById(homeTeam);
  console.log(home);
  const away = await teamService.getTeamById(awayTeam);
  console.log(away);
  if (!home || !away) {
    return res.status(404).json({ message: UNKNOWN_TEAM });
  }
  next();
};

export default matchesMiddleware;
