export default interface ITeamsServices {
  getAllTeams(): Promise<object>
  getTeamById(teamId: string): Promise<object>
}
