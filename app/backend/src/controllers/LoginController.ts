import { Request, Response } from 'express';
import ILoginServices from '../interfaces/ILoginServices';

export default class LoginController {
  private readonly loginService: ILoginServices;

  constructor(loginService: ILoginServices) {
    this.loginService = loginService;
  }

  async login(req: Request, res: Response): Promise<Response> {
    const token = await this.loginService.login(req.body);
    return res.status(200).json(token);
  }

  async validateLogin(req: Request, res: Response): Promise<Response> {
    const token = req.header('Authorization');
    const role = await this.loginService.validateLogin(token);
    return res.status(200).json(role);
  }
}
