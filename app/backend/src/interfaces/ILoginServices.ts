import IUser from './IUser';

export default interface ILoginServices {
  login (user: IUser): Promise<object>
  validateLogin (token: string | undefined): Promise<object>
}
