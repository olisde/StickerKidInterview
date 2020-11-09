using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebInterviewApp.Models;
using WebInterviewApp.Utilities;
using Dapper;
using Microsoft.AspNetCore.Cors;
using WebInterviewApp.Classes;

//using Microsoft.AspNetCore.Authorization;

namespace WebInterviewApp.Controllers
{
    //[Authorize]
    [Route("api/game/")]
    [EnableCors]
    [ApiController]
    public class GameController : ControllerBase
    {
        private DbService db = new DbService();

        [HttpGet]
        public async Task<ActionResult<List<Game>>> GetAll()
        {

            using var connection = db.con;
            connection.Open();
            var repository = (await connection.GetListAsync<Game>()).ToList();

            if (repository.Any())
            {
                return Ok(repository);
            }

            return BadRequest("Unable to retrieve the data");
        }
        
        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<Game>> GetSpecific(int id)
        {
            using var connection = db.con;
            connection.Open();
            var repository = (await connection.GetAsync<Game>(id));

            if (repository != null)
            {
                return Ok(repository);
            }

            return BadRequest($"Unable to retrieve game {id}");
        }
        
        [Route("insert")]
        [HttpPost]
        public async Task<ActionResult> InsertGame([FromBody] GameInsert g)
        {
            using var connection1 = db.con;
            connection1.Open();

            var listOfSinglePlayerIds = new List<int>();

            var checkIfP1Team = (await connection1.GetAsync<Player>(g.Player1)); 
            listOfSinglePlayerIds.Add(checkIfP1Team.PlayerId);
            if (checkIfP1Team.IsTeam)
            {
                var teamPlayer1 = (await connection1.GetAsync<Player>(checkIfP1Team.P1)); 
                var teamPlayer2 = (await connection1.GetAsync<Player>(checkIfP1Team.P2)); 
                listOfSinglePlayerIds.Add(teamPlayer1.PlayerId);
                listOfSinglePlayerIds.Add(teamPlayer2.PlayerId);
            }
            
            var checkIfP2Team = (await connection1.GetAsync<Player>(g.Player2)); 
            if (listOfSinglePlayerIds.Contains(checkIfP2Team.PlayerId))
            {
                return BadRequest("At least one of the players is repeating");
            }
            
            if (checkIfP2Team.IsTeam)
            {
                var team2Player1 = (await connection1.GetAsync<Player>(checkIfP2Team.P1)); 
                var team2Player2 = (await connection1.GetAsync<Player>(checkIfP2Team.P2));
                var validate = listOfSinglePlayerIds.Contains(team2Player1.PlayerId) || listOfSinglePlayerIds.Contains(team2Player2.PlayerId);
                if (validate)
                {
                    return BadRequest("At least one of the players is repeating");
                }
            }
            
            var newGame = new Game(g.Player1, g.Player2,
                Math.Abs(g.Player1Goals), Math.Abs(g.Player2Goals), g.GamePlayed);

            using var connection2 = db.con;
            var repository = (await connection2.InsertAsync<Game>(newGame));
            if (repository != null)
            {
                return Ok($"{repository}");
            }

            return BadRequest("Unable to add the game");
        }
        
        [Route("{del}")]
        [HttpPost]
        public  ActionResult DeleteGame()
        {
            throw new NotImplementedException();
        }
    }
}
 