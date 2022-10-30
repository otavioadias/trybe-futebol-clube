export default interface ILeaderBoardServices {
  leaderboardHome (): Promise<object[] | unknown>
}
