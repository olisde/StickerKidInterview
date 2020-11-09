using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace WebInterviewApp.Models
{   

    [Table("games")]
    public class Game
    {
        [Key]
        public int GameId { get; set; }
        public int Player1 { get; set; }
        public int Player2 { get; set; }
        public int Player1Goals { get; set; }
        public int Player2Goals { get; set; }
        public DateTime GamePlayed { get; set; }
        
        public bool Updated { get; set; }

        public Game()
        {
        }
        
        public Game(int player1, int player2,  int goals1, int goals2 ,string timestamp )
        {
            this.Player1 = player1;
            this.Player2 = player2;
            this.Player1Goals = goals1;
            this.Player2Goals = goals2;
            this.GamePlayed = Convert.ToDateTime(timestamp);
        }
        public Game(int player1, int player2,  int goals1, int goals2 )
        {
            this.Player1 = player1;
            this.Player2 = player2;
            this.Player1Goals = goals1;
            this.Player2Goals = goals2;
        }
    }
}
