export default interface ILeaderBoardServices {
  leaderboard(): Promise<object[] | unknown>,
  leaderboardHome(): Promise<object[] | unknown>
}
