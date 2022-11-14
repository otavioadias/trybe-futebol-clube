import { JwtPayload } from 'jsonwebtoken';
import IMatchesServices, { inProgressType, Matche } from '../interfaces/IMatchesServices';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import verify from '../utils/JWTVerify';
import InvalidTokenError from '../errors/invalid-token-error';

export default class MatchesService implements IMatchesServices {
  private tokenUser: string | undefined;

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

  public async newMatche(token: string | undefined, informations: Matche)
    : Promise<object | void> {
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
  }

  public async validateUser(token: string | undefined): Promise<string | void | JwtPayload> {
    try {
      this.tokenUser = token;
      if (token) {
        const verifyToken = await verify(token);
        return verifyToken;
      }
    } catch (e) {
      throw new InvalidTokenError('Token must be a valid token');
    }
  }

  public finishMatche = async (id: string): Promise<void> => {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  public updateMatche = async (id: string, homeTeamGoals: string, awayTeamGoals: string)
  : Promise<object | null> => {
    await Matches.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    const matche = await Matches.findOne({ where: { id } });
    return matche;
  };
}
