import { Sequelize } from 'sequelize/types';
import leaderboard from '../utils/queryLeaderboard';
import config from '../database/models';

export default class LeaderboardService {
  public seq: Sequelize;

  constructor() {
    this.seq = config;
  }

  public async leaderboardHome(): Promise<object[] | unknown> {
    const [allleaderboards] = await this.seq.query(leaderboard);
    return allleaderboards;
  }
}
