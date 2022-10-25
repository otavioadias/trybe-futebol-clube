import bcrypt = require('bcryptjs');
import IUser from '../interfaces/IUser';
import MissingParamError from '../errors/missing-param-error';
import ILoginServices from '../interfaces/ILoginServices';
import Users from '../database/models/Users';
import generateToken from '../utils/JWT';
import InvalidParamError from '../errors/invalid-param-error';
import decodeJWT from '../utils/decodeJWT';

export default class LoginService implements ILoginServices {
  private pass: string;
  private tokenUser: string;

  async decodePassword(password: string, passwordDB: string): Promise<boolean> {
    this.pass = password;
    const result = await bcrypt.compare(password, passwordDB);
    return result;
  }

  async login(user: IUser): Promise<object> {
    if (!user.email || !user.password) {
      throw new MissingParamError('All fields must be filled');
    }
    const [userExist] = await Users.findAll({ where: { email: user.email } });
    if (!userExist) {
      throw new InvalidParamError('Incorrect email or password');
    }
    const decode = await this.decodePassword(user.password, userExist.password);
    if (decode === false) {
      throw new InvalidParamError('Incorrect email or password');
    }
    const token = await generateToken({
      email: userExist.email, username: userExist.username, role: userExist.role });
    return { token };
  }

  async validateLogin(token: string): Promise<object> {
    this.tokenUser = token;
    const objectUser = await decodeJWT(token);
    return { role: objectUser.role };
  }
}
