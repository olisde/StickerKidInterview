
namespace WebInterviewApp.Classes
{
    public class PlayerName
    { 
        public int PlayerId { get; set; }
        public string TeamPlayerName { get; set; }
        
        public bool IsTeam { get; set; }
        
        public int P1  { get; set; }
        
        public int P2 { get; set; }

        public PlayerName()
        {
        }
        public PlayerName(int id, string name,bool isTeam, int p1, int p2)
        {
            PlayerId = id;
            TeamPlayerName = name;
            IsTeam = IsTeam;
            P1 = p1;
            P2 = p2;
        }
    }

}
