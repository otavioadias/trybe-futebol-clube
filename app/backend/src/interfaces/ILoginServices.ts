import IUser from './IUser';

export default interface ILoginServices {
  login (user: IUser): Promise<object>
}
