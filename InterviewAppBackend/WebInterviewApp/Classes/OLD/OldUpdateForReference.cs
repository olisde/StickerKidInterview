// using System;
// using System.Collections.Generic;
// using System.Linq;
// using Microsoft.AspNetCore.Mvc;
// using System.Threading.Tasks;
// using Dapper;
// using Microsoft.AspNetCore.Cors;
// using WebInterviewApp.Classes;
// using WebInterviewApp.Models;
// using WebInterviewApp.Utilities;
//
//
// namespace WebInterviewApp.Controllers
// {
//     [Route("api/update/old")]
//     [EnableCors]
//     [ApiController]
//     public class UpdateController : ControllerBase
//     {
//     
//         private DbService db = new DbService();
//         
//         [HttpPost]
//         public async Task<ActionResult<Player>> UpdateOld(JsonInput j)
//         {
//             try
//             {
//                 using var connection = db.con;
//                 connection.Open();
//                 // in case of Team team scores, then Player1+teams scores, Then Player2 + teams scores will be updated.
//                 // In case of player just the player will be updated
//                 var playerUpdated = (await connection.GetAsync<Player>(int.Parse(j.Inputstr)));
//                 var total = (await connection.QueryAsync<Result>(
//                     $"select (select COUNT(\"GameId\") from games where \"Player1\" = '{playerUpdated.PlayerId}') " +
//                     $"+ (select COUNT(\"GameId\")from games where \"Player2\" = '{playerUpdated.PlayerId}') as \"value\"")).ToList()[0].value;
//                 var wins = (await connection.QueryAsync<Result>($"select (select COUNT(\"GameId\") from games where \"Player1\" = '{playerUpdated.PlayerId}' and \"Player1Goals\" >\"Player2Goals\" ) " +
//                                                                 $"+ (select COUNT(\"GameId\")from games where \"Player2\" = '{playerUpdated.PlayerId}' and \"Player2Goals\" >\"Player1Goals\") as \"value\"")).ToList()[0].value;
//                 var losses = total- wins;
//                 double ratio;
//                 if ((losses == 0 && wins ==0) || losses > wins) {ratio = 0.0;}
//                 else if (losses == 0 || (losses == 0 && wins > 0)){ratio = Convert.ToDouble(wins);}
//                 else{ratio = Convert.ToDouble(wins) / Convert.ToDouble(total);}
//                 var gf = (await connection.QueryAsync<Result>($"select (select SUM(\"Player1Goals\")from games where \"Player1\" = '{playerUpdated.PlayerId}') + (select SUM(\"Player2Goals\")from games where \"Player2\" = '{playerUpdated.PlayerId}') as \"value\"")).ToList()[0].value;
//                 var ga = (await connection.QueryAsync<Result>($"select (select SUM(\"Player2Goals\")from games where \"Player1\" = '{playerUpdated.PlayerId}') + (select SUM(\"Player1Goals\")from games where \"Player2\" = '{playerUpdated.PlayerId}') as \"value\"")).ToList()[0].value;
//                 var gd = Math.Abs(gf - ga);
//
//                 playerUpdated.TotalGames = total;
//                 playerUpdated.Wins = wins;
//                 playerUpdated.Losses = losses;
//                 playerUpdated.Ratio = ratio;
//                 playerUpdated.GF = gf;
//                 playerUpdated.GA = ga;
//                 playerUpdated.GD = gd;
//
//                 var result = await connection.UpdateAsync<Player>(playerUpdated);
//                 
//                 if (playerUpdated.IsTeam)
//                 {
//                     var bothPlayers = new List<Player>();
//                     var player1 = (await connection.GetAsync<Player>(playerUpdated.P1));
//                     var player2 = (await connection.GetAsync<Player>(playerUpdated.P2));
//                     bothPlayers.Add(player1);
//                     bothPlayers.Add(player2);
//
//                     foreach (var player in bothPlayers)
//                     {
//                         var everyTeam = new List<Player>();
//                         everyTeam = (await connection.QueryAsync<Player>(
//                             $"(select * from players where \"P1\" = '{player.PlayerId}') UNION (select * from players where \"P2\" = '{player.PlayerId}')")).ToList();
//                         Player sumOfTeamStats = new Player("Rorschach");
//                         
//                         foreach (var team in everyTeam)
//                         {
//                             sumOfTeamStats.TotalGames += team.TotalGames;
//                             sumOfTeamStats.Wins += team.Wins;
//                             sumOfTeamStats.Losses += team.Losses;
//                             sumOfTeamStats.GF += team.GF;
//                             sumOfTeamStats.GA += team.GA;
//                         }
//                         player.TotalGames += sumOfTeamStats.TotalGames;
//                         player.Wins += sumOfTeamStats.Wins;
//                         player.Losses += sumOfTeamStats.Losses;
//                         player.GF += sumOfTeamStats.GF;
//                         player.GA += sumOfTeamStats.GA;
//                         player.GD = Math.Abs(player.GF - player.GA);
//                         if ((player.Losses == 0 && player.Wins == 0) || player.Losses > player.Wins) {player.Ratio = 0.0;}
//                         else if (player.Losses == 0 || (player.Losses == 0 && player.Wins > 0)){player.Ratio = Convert.ToDouble(player.Wins);}
//                         else{player.Ratio = Convert.ToDouble(player.Wins) / Convert.ToDouble(player.TotalGames);}
//                         
//                         var updatePlayer =  await connection.UpdateAsync<Player>(player);
//                     }
//                 }
//                 return Ok("Data updated");  
//             }
//             catch (Exception e)
//             {
//                 return BadRequest(e.Message); //"Unable to update"); 
//             }
//         }
//     }
// }
//     
