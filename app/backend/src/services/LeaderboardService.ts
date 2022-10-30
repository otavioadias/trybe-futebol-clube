import { Sequelize } from 'sequelize/types';
import leaderboard from '../utils/queryLeaderboard';
import leaderboardHome from '../utils/queryHomeTeam';
import leaderboardAway from '../utils/queryAwayTeam';
import config from '../database/models';

export default class LeaderboardService {
  public seq: Sequelize;

  constructor() {
    this.seq = config;
  }

  public async leaderboard(): Promise<object[] | unknown> {
    const [allleaderboards] = await this.seq.query(leaderboard);
    return allleaderboards;
  }

  public async leaderboardHome(): Promise<object[] | unknown> {
    const [boardHome] = await this.seq.query(leaderboardHome);
    return boardHome;
  }

  public async leaderboardAway(): Promise<object[] | unknown> {
    const [boardAway] = await this.seq.query(leaderboardAway);
    return boardAway;
  }
}
