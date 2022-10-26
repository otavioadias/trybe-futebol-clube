import IMatchesServices from '../interfaces/IMatchesServices';
import Matches from '../database/models/Matches';

export default class MatchesService implements IMatchesServices {
  public getAllMatches = async (): Promise<object> => {
    const teams = await Matches.findAll();
    return teams;
  };
}
