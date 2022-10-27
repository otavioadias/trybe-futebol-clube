import { JwtPayload } from 'jsonwebtoken';
import IMatchesServices, { inProgressType, Matche } from '../interfaces/IMatchesServices';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import verify from '../utils/JWTVerify';

export default class MatchesService implements IMatchesServices {
  private tokenUser: string;

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

  public newMatche = async (token: string, informations: Matche): Promise<object | void> => {
    const validate = await this.validateUser(token);
    if (validate) {
      const newMatche = await Matches.create({
        homeTeam: informations.homeTeam,
        awayTeam: informations.awayTeam,
        homeTeamGoals: informations.homeTeamGoals,
        awayTeamGoals: informations.awayTeamGoals,
        inProgress: true,
      });
      return newMatche;
    }
  };

  async validateUser(token: string): Promise<string | JwtPayload> {
    this.tokenUser = token;
    const verifyToken = await verify(token);
    return verifyToken;
  }
}
