import ITeamsServices from '../interfaces/ITeamsServices';
import Teams from '../database/models/Teams';

export default class TeamsService implements ITeamsServices {
  public getAllTeams = async (): Promise<object> => {
    const teams = await Teams.findAll();
    return teams;
  };

  getTeamById = async (teamId: string): Promise<object> => {
    const [team] = await Teams.findAll({ where: { id: teamId } });
    return team;
  };
}
