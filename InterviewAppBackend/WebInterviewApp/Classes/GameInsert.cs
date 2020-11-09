
namespace WebInterviewApp.Classes
{   


    public class GameInsert
    {
        public int Player1 { get; set; }
        public int Player2 { get; set; }
        public int Player1Goals { get; set; }
        public int Player2Goals { get; set; }
        public string GamePlayed { get; set; }

        GameInsert()
        {
        }
        public GameInsert(int player1, int player2,  int goals1, int goals2 ,string timestamp )
        {
            Player1 = player1;
            Player2 = player2;
            Player1Goals = goals1;
            Player2Goals = goals2;
            GamePlayed = timestamp;
        }
    }
}