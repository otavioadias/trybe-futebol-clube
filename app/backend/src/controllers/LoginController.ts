import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  private readonly loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  login(req: Request, res: Response): Response | void {
    const error = this.loginService.login(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    return res.sendStatus(201);
  }
}
