import { Request, Response } from 'express';
import IMatchesServices from '../interfaces/IMatchesServices';

export default class TeamsController {
  private readonly matchesService: IMatchesServices;

  constructor(teamsServices: IMatchesServices) {
    this.matchesService = teamsServices;
  }

  async getAllMatches(req: Request, res: Response): Promise<Response> {
    const matches = await this.matchesService.getAllMatches();
    return res.status(200).json(matches);
  }
}
