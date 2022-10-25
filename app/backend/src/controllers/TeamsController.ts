import { Request, Response } from 'express';
import ITeamsServices from '../interfaces/ITeamsServices';

export default class TeamsController {
  private readonly teamsServices: ITeamsServices;

  constructor(teamsServices: ITeamsServices) {
    this.teamsServices = teamsServices;
  }

  async getAllTeams(req: Request, res: Response): Promise<Response> {
    const teams = await this.teamsServices.getAllTeams();
    return res.status(200).json(teams);
  }
}
