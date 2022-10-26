import { ParsedQs } from 'qs';

type inProgressType = string | ParsedQs | string[] | ParsedQs[] | undefined;

export default interface IMatchesServices {
  getAll(): Promise<object>,
  getAllMatches(inProgress: inProgressType): Promise<object>,
  getByProgress(inProgress: boolean): Promise<object>,
}
