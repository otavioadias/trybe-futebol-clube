import { Request, Response } from 'express';
import ILeaderBoardServices from '../interfaces/ILeaderboardServices';

export default class LeaderBoardController {
  private readonly leaderboardServices: ILeaderBoardServices;

  constructor(leaderboardServices: ILeaderBoardServices) {
    this.leaderboardServices = leaderboardServices;
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const board = await this.leaderboardServices.leaderboard();
    return res.status(200).json(board);
  }

  async getHome(req: Request, res: Response): Promise<Response> {
    const home = await this.leaderboardServices.leaderboardHome();
    return res.status(200).json(home);
  }

  async getAway(req: Request, res: Response): Promise<Response> {
    const away = await this.leaderboardServices.leaderboardAway();
    return res.status(200).json(away);
  }
}
