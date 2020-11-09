using System;
using System.Text.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebInterviewApp.Models;
using WebInterviewApp.Utilities;
using WebInterviewApp.Classes;
using Dapper;
using Microsoft.AspNetCore.Cors;

//using Microsoft.AspNetCore.Authorization;

namespace WebInterviewApp.Controllers
{
    //[Authorize]
    [Route("api/player/")]
    [EnableCors]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private DbService db = new DbService();

        [HttpGet]
        public async Task<ActionResult<List<Player>>> GetAll()
        {

            using var connection = db.con;
            connection.Open();
            var repository = (await connection.GetListAsync<Player>()).ToList();
            
            if (repository.Any()){
                return Ok(repository);
            }

            return BadRequest("Unable to retrieve the data");
        }
        
        [Route("names")]
        [HttpGet]
        public async Task<ActionResult<List<PlayerName>>> GetNames()
        {

            using var connection = db.con;
            connection.Open();
            var repository = (await connection.QueryAsync<PlayerName>($"select \"PlayerId\", \"TeamPlayerName\",\"IsTeam\",\"P1\",\"P2\" from players order by \"TeamPlayerName\"")).ToList();

            if (repository.Any())
            {
                return Ok(repository);
            }
            return BadRequest("Unable to retrieve the data");
        }

        [Route("teams")]
        [HttpPost]
        public async Task<ActionResult<List<PlayerName>>> GetTeamVS(JsonInput j)
        {
            try
            {
                var inputTeams = j.Inputstr.Split(',').ToList();
                
                using var connection = db.con;
                connection.Open();
                var team1 = await connection.GetAsync<Player>(int.Parse(inputTeams[0]));
                var team2 = await connection.GetAsync<Player>(int.Parse(inputTeams[1]));
                var allGames = (await connection.QueryAsync<Game>
                        ($"select * from games where (\"Player1\" = '{team1.PlayerId}' and \"Player2\" = '{team2.PlayerId}') or (\"Player1\" = '{team2.PlayerId}' and \"Player2\" = '{team1.PlayerId}')")).ToList();
                if (!allGames.Any())
                {
                    return Ok(null);
                }

                var alignedList = new List<Game>();
                foreach (var game in allGames)
                {
                    

                    if (game.Player2 == team1.PlayerId)
                    {
                        var substitute = new Game(game.Player2,game.Player1,game.Player2Goals,game.Player1Goals);
                        alignedList.Add(substitute);
                    }
                    else
                    {
                        alignedList.Add(game);
                    }
                }

                TeamVsTeam output = new TeamVsTeam();
                

                foreach (var game in alignedList)
                {
                    output.TotalGames += 1;
                    if (game.Player1Goals > game.Player2Goals){output.TotalWins += 1;}else{output.TotalLosses += 1;}
                    output.TotalGF += game.Player1Goals;
                    output.TotalGA += game.Player2Goals;
                }

                var toReturnJSON = JsonSerializer.Serialize(output);
                return Ok(toReturnJSON);
            }
            catch (Exception)
            {
                return BadRequest(null);
            }

        }
        
        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<Player>> GetSpecific(int id)
        {
            using var connection = db.con;
            connection.Open();
            var repository = (await connection.GetAsync<Player>(id));

            if (repository != null)
            {
                return Ok(repository);
            }
            return BadRequest($"Unable to retrieve user {id}");
        }
        
        [Route("insert")]
        [HttpPost]
        public async Task<ActionResult> InsertPlayer(JsonInput j)
        {
           var inputParams = j.Inputstr.Split(',').ToList();
           var newPlayer = new Player(inputParams[1]);
           if (inputParams[0] == "team")
           {
               newPlayer.IsTeam = true;
               newPlayer.P1 = int.Parse(inputParams[2]);
               newPlayer.P2 = int.Parse(inputParams[3]);
           }
           else
           {
               newPlayer.IsTeam = false;
               newPlayer.P1 = 0;
               newPlayer.P2 = 0;
           }
           using var connection = db.con;
            connection.Open();
            
            var checkIfExists = (await connection.QueryAsync<Player>
                ($"select * from players where \"TeamPlayerName\" = '{newPlayer.TeamPlayerName}' "));
            
            if (checkIfExists.Count() != 0) {
                return BadRequest("Unable to add the player");}
            
            if (newPlayer.IsTeam)
            {
                var checkIfCombo = (await connection.QueryAsync<Player>
                    ($"select * from players where (\"P1\" = '{newPlayer.P1}' and \"P2\" = '{newPlayer.P2}') or (\"P1\" = '{newPlayer.P2}' and \"P2\" = '{newPlayer.P1}')"));
                
                if (checkIfCombo.Count() != 0)
                {
                    return BadRequest($"Those players are already in a team");
                }
            }
            var repository = (await connection.InsertAsync<Player>(newPlayer));
            if (repository != null)
            {
                return Ok("Player added successfully!");
            }
            return BadRequest("Unable to add the player");
        }

        [Route("{del}")]
        [HttpPost]
        public async Task<ActionResult> DeletePlayer([FromBody] JsonInput j)
        {
            var delPlayer = new Player(j.Inputstr);
            
            using var connection = db.con;
            connection.Open();
            var checkIfExists = (await connection.QueryAsync<Player>
                ($"select * from players where \"TeamPlayerName\" = '{delPlayer.TeamPlayerName}' ")).ToList();

            if (!checkIfExists.Any()) {
                return BadRequest("Unable to delete the player");}
            var repository = (await connection.DeleteAsync<Player>(checkIfExists[0]));

            return Ok("Player removed successfully!");
        }

   
    }
}