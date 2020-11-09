
namespace WebInterviewApp.Classes
{   


    public class TeamVsTeam
    {
        public int TotalGames { get; set; }
        public int TotalWins { get; set; }
        public int TotalLosses { get; set; }
        public int TotalGF { get; set; }
        public int TotalGA { get; set; }

        public TeamVsTeam()
        {
            this.TotalGames = 0;
            this.TotalWins = 0;
            this.TotalLosses = 0;
            this.TotalGF = 0;
            this.TotalGA = 0;
        }
    }
}