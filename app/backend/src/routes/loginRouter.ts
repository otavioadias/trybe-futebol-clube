import { Request, Response, Router } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';

const loginService = new LoginService();
const loginController = new LoginController(loginService);
const router = Router();

router
  .post(
    '/login',
    (
      req: Request,
      res: Response,
    ) => loginController.login(req, res),
  );

router
  .get(
    '/login/validate',
    (
      req: Request,
      res: Response,
    ) => loginController.validateLogin(req, res),
  );

export default router;
