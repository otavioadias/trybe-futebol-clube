import ITeamsServices from '../interfaces/ITeamsServices';
import Teams from '../database/models/Teams';

export default class TeamsService implements ITeamsServices {
  public getAllTeams = async (): Promise<object> => {
    const teams = await Teams.findAll();
    return teams;
  };
}
