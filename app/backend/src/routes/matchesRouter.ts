import { Request, Response, Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import matchesMiddleware from '../middlewares/matchesMiddleware';
import unknownTeamMiddleware from '../middlewares/unknownTeamMiddleware';

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

router
  .post(
    '/matches',
    matchesMiddleware,
    unknownTeamMiddleware,
    (
      req: Request,
      res: Response,
    ) => matchesController.newMatche(req, res),
  );

router
  .patch(
    '/matches/:id/finish',
    (
      req: Request,
      res: Response,
    ) => matchesController.finishMatche(req, res),
  );

export default router;
