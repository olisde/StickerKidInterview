import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';


const useRefresh = () => useState()[1];

function TeamvsTeam(){  
  const refresh = useRefresh()
  const style =  makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),fontSize: 30,
      minWidth: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  // eslint-disable-next-line
  const [playerData,setPlayerData] = useState([]);

  const classes = style();

  const [team, setTeam] = useState("");
  const [team2, setTeam2] = useState("");
  const [results, setResults] = useState(null);
  

  useEffect( () =>{axios.get("https://localhost:6001/api/player/names").then(response=>{let toReturn = response.data;setPlayerData(toReturn)})},[]);

  const teamChange = (event) => {
    setTeam(event.target.value);
    };
  const team2Change = (event) => {
    setTeam2(event.target.value);
    };

  function validate(){
    try{
      if (team === team2) throw new Error("You must select different teams");
      addNClean()
      }
      catch (error){
        alert (error.message);
      }
    }

  function getTeams(){
    const toReturn = []
     playerData.forEach(player => {(player.isTeam)? toReturn.push(<MenuItem key={player.teamPlayerName} value={player.playerId}>{player.teamPlayerName}</MenuItem>) :void(0)});
     return toReturn
    };
  
    function getStats(){
      
      if (results === null || results === "") {
        return(<div>Pick teams with no repeating players and click GET STATS</div>)
      }
      else{
        return(
          <div id = "stats">
          <h3>Team 1 has played {results.TotalGames} game(s) against Team 2</h3>
          <h3>Team 1 has won {results.TotalWins} and lost {results.TotalLosses} game(s) in this matchup</h3>
          <h3>Team 1 has scored {results.TotalGF} goal(s) in this matchup</h3>
          <h3>Team 1 has conceded {results.TotalGA} goals(s) in this matchup</h3>
          </div>
          )
    }   
    }
       
  async function addNClean(){
    try {
      const choices = `${team},${team2}`
       ;
      const insertData =  {"inputstr": choices};
      let config = {headers: {
        'Content-Type': 'application/json'
        }};
      await axios.post("https://localhost:6001/api/player/teams",insertData,config).then(result=>{let resp = result.data;setResults(resp)});
    } 
    catch (error) {
      alert ("Unable to retrieve the data!");
    }
  };


  return(
    <>
    
      <div>
        <FormControl id="select-t1f" variant="outlined" className={classes.formControl}>
        <InputLabel id="select-t1l" >&emsp;Team 1 &emsp;</InputLabel>
        <Select
          labelId="select-t1c"
          id="select-t1c"
          value={team}
          onChange={teamChange}
          OnClick= {refresh}
          defaultValue = "None"
          label="Player 1"
        >
          {getTeams()}
        </Select>
        </FormControl>
        <FormControl id="select-t2f" variant="outlined" className={classes.formControl}>
        <InputLabel id="select-t2l">&emsp; Team 2 &emsp;</InputLabel>
        <Select
          labelId="select-t2c"
          id="select-t2c"
          value={team2}
          defaultValue = "None"
          onChange={team2Change}
          OnClick= {refresh}
          label="Team 2"
        >
          {getTeams()}
        </Select>
      </FormControl>
     
    </div>
    <div>
      <span>&nbsp;&nbsp;</span>
    <Button variant="contained" color="primary" onClick= {validate}>
        GET STATS
    </Button>
    </div>
    {getStats()}
    </>
  );
};

export default TeamvsTeam