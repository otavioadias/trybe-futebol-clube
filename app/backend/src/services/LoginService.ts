interface IUser {
  email: string,
  username?: string,
  role?: string,
  password: string,
}

export default class LoginService {
  private user: IUser;

  login(user: IUser): object {
    this.user = user;
    if (!user.email) {
      return { error: 'O campo "email" é obrigatório' };
    }
    if (!user.password) {
      return { error: 'O campo "password" é obrigatório' };
    }
    return { message: 'ok' };
  }
}
