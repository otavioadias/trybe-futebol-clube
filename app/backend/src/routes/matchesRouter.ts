import { Request, Response, Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);
const router = Router();

router
  .get(
    '/matches',
    (
      req: Request,
      res: Response,
    ) => matchesController.getAllMatches(req, res),
  );

export default router;
