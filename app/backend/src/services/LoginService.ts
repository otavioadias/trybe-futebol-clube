import bcrypt = require('bcryptjs');
import IUser from '../interfaces/IUser';
import MissingParamError from '../errors/missing-param-error';
import ILoginServices from '../interfaces/ILoginServices';
import Users from '../database/models/Users';
import generateToken from '../utils/JWT';

export default class LoginService implements ILoginServices {
  private user: IUser;
  private pass: string;

  async decodePassword(password: string, passwordDB: string): Promise<boolean> {
    this.pass = password;
    const result = await bcrypt.compare(password, passwordDB);
    return result;
  }

  async login(user: IUser): Promise<void | object> {
    this.user = user;
    if (!user.email) {
      throw new MissingParamError('O campo "email" é obrigatório');
    }
    if (!user.password) {
      throw new MissingParamError('O campo "password" é obrigatório');
    }
    const [userExist] = await Users.findAll({ where: { email: user.email } });
    const decode = await this.decodePassword(user.password, userExist.password);
    if (decode === true) {
      const token = await generateToken({ email: userExist.email, username: userExist.username });
      return { token };
    }
  }
}
