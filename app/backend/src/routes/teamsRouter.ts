import { Request, Response, Router } from 'express';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);
const router = Router();

router
  .get(
    '/teams',
    (
      req: Request,
      res: Response,
    ) => teamsController.getAllTeams(req, res),
  );

export default router;
