import { ParsedQs } from 'qs';

export type inProgressType = string | ParsedQs | string[] | ParsedQs[] | undefined;

export type Matche = {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export default interface IMatchesServices {
  getAll(): Promise<object>,
  getAllMatches(inProgress: inProgressType): Promise<object>,
  getByProgress(inProgress: boolean): Promise<object>,
  newMatche(token: string | undefined, informations: Matche): Promise<object | void>,
  finishMatche(id: string): Promise<void>,
}
