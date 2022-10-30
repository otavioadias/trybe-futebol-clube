import { Request, Response } from 'express';
import ILeaderBoardServices from '../interfaces/ILeaderboardServices';

export default class LeaderBoardController {
  private readonly leaderboardServices: ILeaderBoardServices;

  constructor(leaderboardServices: ILeaderBoardServices) {
    this.leaderboardServices = leaderboardServices;
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const board = await this.leaderboardServices.leaderboardHome();
    console.log(board);
    return res.status(200).json(board);
  }
}
