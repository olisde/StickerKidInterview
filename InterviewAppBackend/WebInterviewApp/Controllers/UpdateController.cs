using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Cors;
using WebInterviewApp.Models;
using WebInterviewApp.Utilities;


namespace WebInterviewApp.Controllers
{
    [Route("api/update/")]
    [EnableCors]
    [ApiController]
    public class UpdateController : ControllerBase
    {
    
        private DbService db = new DbService();
        
        [HttpGet]
        public async Task<ActionResult<Player>> Update()
        {
            try
            {
                using var connection = db.con;
                connection.Open();

                var games = (await connection.GetListAsync<Game>(new {Updated = false}));
                foreach (var gamePlayed in games)
                {
                    var p1 = (await connection.GetAsync<Player>(gamePlayed.Player1));
                    var p2 = (await connection.GetAsync<Player>(gamePlayed.Player2));
                    var toUpdate = new List<Player> {p1, p2};
                    foreach (var playerUpdated in toUpdate)
                    {
                        var whichPlayer = (playerUpdated.PlayerId == gamePlayed.Player1) ? 1 : 2;
                        var singleOrTeam = new List<Player> {playerUpdated};
                        if (playerUpdated.IsTeam)
                        {
                            singleOrTeam.Add(await connection.GetAsync<Player>(playerUpdated.P1));
                            singleOrTeam.Add(await connection.GetAsync<Player>(playerUpdated.P2));
                        }

                        foreach (var player in singleOrTeam)
                        {
                            player.TotalGames += 1;
                            if (whichPlayer == 1)
                            {
                                player.Wins += (gamePlayed.Player1Goals > gamePlayed.Player2Goals) ? 1 : 0;
                            }
                            else
                            {
                                player.Wins += (gamePlayed.Player2Goals > gamePlayed.Player1Goals) ? 1 : 0;
                            }

                            if (whichPlayer == 1)
                            {
                                player.Losses += (gamePlayed.Player2Goals > gamePlayed.Player1Goals) ? 1 : 0;
                            }
                            else
                            {
                                player.Losses += (gamePlayed.Player1Goals > gamePlayed.Player2Goals) ? 1 : 0;
                            }

                            if (whichPlayer == 1)
                            {
                                player.GF += gamePlayed.Player1Goals;
                                player.GA += gamePlayed.Player2Goals;

                            }
                            else
                            {
                                player.GF += gamePlayed.Player2Goals;
                                player.GA += gamePlayed.Player1Goals;
                            }

                            player.GD = Math.Abs(player.GF - player.GA);

                            if ((player.Losses == 0 && player.Wins == 0) || player.Losses > player.Wins)
                            {
                                player.Ratio = 0.0;
                            }
                            else if (player.Losses == 0 || (player.Losses == 0 && player.Wins > 0))
                            {
                                player.Ratio = Convert.ToDouble(player.Wins);
                            }
                            else
                            {
                                player.Ratio = Convert.ToDouble(player.Wins) / Convert.ToDouble(player.TotalGames);
                            }

                            var dbUpdate = await connection.UpdateAsync(player);
                        }
                    }

                    gamePlayed.Updated = true;
                    var dbGameUpdate = await connection.UpdateAsync(gamePlayed);
                }
                return Ok("Data updated");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message); //"Unable to update"); 
            }
        }
    }
}
    
