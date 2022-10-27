import { Request, Response } from 'express';
import IMatchesServices from '../interfaces/IMatchesServices';

export default class TeamsController {
  private readonly matchesService: IMatchesServices;

  constructor(teamsServices: IMatchesServices) {
    this.matchesService = teamsServices;
  }

  async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getAllMatches(inProgress);
    return res.status(200).json(matches);
  }

  async newMatche(req: Request, res: Response): Promise<Response> {
    const token = req.header('Authorization');
    const matche = await this.matchesService.newMatche(token, req.body);
    return res.status(201).json(matche);
  }

  async finishMatche(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.matchesService.finishMatche(id);
    return res.status(200).json({ message: 'Finished' });
  }
}
