import IMatchesServices from '../interfaces/IMatchesServices';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesService implements IMatchesServices {
  public getAllMatches = async (): Promise<object> => {
    const teams = await Matches.findAll({
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
    return teams;
  };
}
