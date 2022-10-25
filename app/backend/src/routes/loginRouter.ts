import { Request, Response, Router } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';
// import loginMiddleware from '../middlewares/loginMiddleware';

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

export default router;
