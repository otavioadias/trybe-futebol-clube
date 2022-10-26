import { ParsedQs } from 'qs';
import IMatchesServices from '../interfaces/IMatchesServices';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

type inProgressType = string | ParsedQs | string[] | ParsedQs[] | undefined;

export default class MatchesService implements IMatchesServices {
  public getByProgress = async (inProgress: boolean): Promise<object> => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
      where: { inProgress },
    });
    return matches;
  };

  public getAll = async (): Promise<object> => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  };

  public getAllMatches = async (inProgress: inProgressType): Promise<object> => {
    if (inProgress) {
      return this.getByProgress(inProgress === 'true');
    }
    return this.getAll();
  };
}
