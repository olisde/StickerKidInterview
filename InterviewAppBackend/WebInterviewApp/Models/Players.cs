using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace WebInterviewApp.Models
{   
    [Table("players")]
    public class Player
    {   [Key]
        public int PlayerId { get; set; }
        public string TeamPlayerName { get; set; }
        public int TotalGames { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
        public double Ratio { get; set; }
        public int GF { get; set; }
        public int GA { get; set; }
        public int GD { get; set; }
        
        public bool IsTeam { get; set; }
        public int P1  { get; set; }
        public int P2 { get; set; }
        //empty constructor
        public Player()
        {
        }
        //single player constructor
        public Player(string name)
        {
            this.TeamPlayerName = name;
        }
        // team constructor
        public Player(string name, int p1, int p2)
        {
            this.TeamPlayerName = name;
            IsTeam = true;
            this.P1 = p1;
            this.P2 = p2;
        }
    }

}
