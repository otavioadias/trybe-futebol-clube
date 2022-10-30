const leaderboardAway = `SELECT 
t.team_name AS name,
(SELECT 
(((SELECT 
  COUNT(*) 
     FROM TRYBE_FUTEBOL_CLUBE.matches 
    WHERE home_team_goals < away_team_goals AND away_team = t.id AND in_progress = 0) * 3 ) 
+((SELECT 
 COUNT(*) 
     FROM TRYBE_FUTEBOL_CLUBE.matches 
    WHERE home_team_goals > away_team_goals AND away_team = t.id AND in_progress = 0) * 0) 
+((SELECT 
 COUNT(*) 
     FROM TRYBE_FUTEBOL_CLUBE.matches 
    WHERE away_team_goals = home_team_goals AND away_team = t.id AND in_progress = 0) * 1))) 
       AS totalPoints,
(SELECT 
COUNT(*) 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE away_team = t.id AND in_progress = 0) 
      AS totalGames,
(SELECT 
COUNT(*) 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE home_team_goals < away_team_goals AND away_team = t.id AND in_progress = 0) 
      AS totalVictories,
(SELECT 
COUNT(*) 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE home_team_goals > away_team_goals AND away_team = t.id AND in_progress = 0) 
      AS totalLosses,
(SELECT 
COUNT(*) 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE away_team_goals = home_team_goals AND away_team = t.id AND in_progress = 0) 
      AS totalDraws,
(SELECT 
((SELECT SUM(away_team_goals) 
      AS totalgoalsFavor 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE away_team = t.id AND in_progress = 0)) 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE away_team = t.id 
   GROUP BY away_team = t.id) 
      AS goalsFavor,
(SELECT 
((SELECT SUM(home_team_goals)  
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE away_team = t.id AND in_progress = 0)) 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE away_team = t.id 
   GROUP BY away_team = t.id) AS goalsOwn,
(SELECT 
((SELECT SUM(away_team_goals) 
      AS totalgoalsFavor 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE away_team = t.id 
     AND in_progress = 0))
-
((SELECT SUM(home_team_goals) 
      AS goalsOwn 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE away_team = t.id 
     AND in_progress = 0))) 
      AS goalsBalance,
(SELECT (
((SELECT (
((SELECT 
COUNT(*) 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE home_team_goals < away_team_goals AND away_team = t.id AND in_progress = 0) * 3 ) + 
((SELECT 
COUNT(*) 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE home_team_goals > away_team_goals AND away_team = t.id AND in_progress = 0) * 0) +
((SELECT 
COUNT(*) 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE away_team_goals = home_team_goals AND away_team = t.id AND in_progress = 0) * 1))) / (
((SELECT 
COUNT(*) 
    FROM TRYBE_FUTEBOL_CLUBE.matches 
   WHERE away_team = t.id AND in_progress = 0)) * 3)) * 100)) 
      AS efficiency
 FROM TRYBE_FUTEBOL_CLUBE.teams 
   AS t 
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches 
   AS m 
   ON t.id = m.away_team 
  AND in_progress = 0
GROUP BY m.away_team
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;

export default leaderboardAway;
