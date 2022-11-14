-- TEAMS
SELECT m.away_team AS id,
t.team_name AS name,
(SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE (away_team = t.id AND in_progress = 0) OR (home_team = t.id AND in_progress = 0)) AS totalGames,
(SELECT (
((SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team_goals > away_team_goals AND home_team = t.id AND in_progress = 0 OR away_team_goals > home_team_goals AND away_team = t.id AND in_progress = 0) * 3 )
+
((SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team_goals < away_team_goals AND home_team = t.id AND in_progress = 0 OR away_team_goals < home_team_goals AND away_team = t.id AND in_progress = 0) * 0)
+
((SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team_goals = home_team_goals AND home_team = t.id AND in_progress = 0 OR home_team_goals = away_team_goals AND away_team = t.id AND in_progress = 0) * 1)
)) AS totalPoints,
(SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team_goals > away_team_goals AND home_team = t.id AND in_progress = 0 OR away_team_goals > home_team_goals AND away_team = t.id AND in_progress = 0) AS totalVictories,
(SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team_goals < away_team_goals AND home_team = t.id AND in_progress = 0 OR away_team_goals < home_team_goals AND away_team = t.id AND in_progress = 0) AS totalLosses,
(SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team_goals = home_team_goals AND home_team = t.id AND in_progress = 0 OR home_team_goals = away_team_goals AND away_team = t.id AND in_progress = 0) AS totalDraws,
(SELECT ((SELECT SUM(home_team_goals) AS totalgoalsFavor FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = t.id AND in_progress = 0)
+ (SELECT SUM(away_team_goals) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team = t.id AND in_progress = 0)) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = t.id GROUP BY home_team = t.id) AS goalsFavor,
(SELECT ((SELECT SUM(away_team_goals) AS goalsOwn FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = t.id AND in_progress = 0)
+ (SELECT SUM(home_team_goals) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team = t.id AND in_progress = 0)) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = t.id GROUP BY home_team = t.id) AS goalsOwn,
(SELECT (
(SELECT ((SELECT SUM(home_team_goals) AS totalgoalsFavor FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = t.id AND in_progress = 0)
+ (SELECT SUM(away_team_goals) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team = t.id AND in_progress = 0)) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = t.id GROUP BY home_team = t.id)
-
(SELECT ((SELECT SUM(away_team_goals) AS goalsOwn FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = t.id AND in_progress = 0)
+ (SELECT SUM(home_team_goals) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team = t.id AND in_progress = 0)) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = t.id GROUP BY home_team = t.id)
)) AS goalsBalance,
(SELECT ((
(SELECT (
((SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team_goals > away_team_goals AND home_team = t.id AND in_progress = 0 OR away_team_goals > home_team_goals AND away_team = t.id AND in_progress = 0) * 3 )
+
((SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team_goals < away_team_goals AND home_team = t.id AND in_progress = 0 OR away_team_goals < home_team_goals AND away_team = t.id AND in_progress = 0) * 0)
+
((SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team_goals = home_team_goals AND home_team = t.id AND in_progress = 0 OR home_team_goals = away_team_goals AND away_team = t.id AND in_progress = 0) * 1)
)) / (((SELECT COUNT(*) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team = t.id AND in_progress = 0 OR home_team = t.id AND in_progress = 0)) * 3)) * 100)) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS t 
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS m 
ON t.id = m.away_team 
AND in_progress = 0
GROUP BY m.away_team;




SELECT COUNT(*) AS totalGames FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = 12 OR away_team = 12 AND in_progress = 0;

SELECT COUNT(*) AS totalVictories 
FROM TRYBE_FUTEBOL_CLUBE.matches 
WHERE home_team_goals > away_team_goals AND home_team = 1 OR away_team_goals > home_team_goals AND away_team = 1;

SELECT COUNT(*) AS totalLosses 
FROM TRYBE_FUTEBOL_CLUBE.matches 
WHERE away_team_goals > home_team_goals AND home_team = 1
OR home_team_goals > away_team_goals AND away_team = 1;

SELECT COUNT(*) AS totalDraws 
FROM TRYBE_FUTEBOL_CLUBE.matches 
WHERE away_team_goals = home_team_goals AND home_team = 1
OR home_team_goals = away_team_goals AND away_team = 1;

SELECT COUNT(*) AS totalDraws FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team_goals = away_team_goals AND home_team = 2;

SELECT SUM(home_team_goals) AS totalgoalsFavor FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = 1;
SELECT SUM(away_team_goals) AS totalgoalsFavor FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team = 1;

SELECT ((SELECT SUM(home_team_goals) AS totalgoalsFavor FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = 12 AND in_progress = 0)
+ (SELECT SUM(away_team_goals) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team = 12 AND in_progress = 0)) AS totalgoalsFavor
FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = 12 GROUP BY home_team = 12;


SELECT SUM(away_team_goals) AS goalsOwn FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = 1;

SELECT ((SELECT SUM(away_team_goals) AS goalsOwn FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = 12 AND in_progress = 0)
+ (SELECT SUM(home_team_goals) FROM TRYBE_FUTEBOL_CLUBE.matches WHERE away_team = 12 AND in_progress = 0)) AS goalsOwn
FROM TRYBE_FUTEBOL_CLUBE.matches WHERE home_team = 12 GROUP BY home_team = 12;


SELECT SUM(away_team_goals) -  SUM(home_team_goals) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.matches 
WHERE away_team = 12 OR home_team = 12;


SELECT 
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
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC
