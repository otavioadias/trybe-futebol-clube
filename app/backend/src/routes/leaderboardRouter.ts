import { Request, Response, Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);
const router = Router();

router
  .get(
    '/leaderboard',
    (
      req: Request,
      res: Response,
    ) => leaderboardController.getAll(req, res),
  );

export default router;
