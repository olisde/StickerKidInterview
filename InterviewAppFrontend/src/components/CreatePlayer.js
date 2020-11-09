import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';



const useRefresh = () => useState()[1];

function Create(){  
  const refresh = useRefresh()
  const style =  makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  const style2 = makeStyles((theme) => ({
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
  const classes2 = style2(); 
  
  const [mode, setMode] = useState("");
  const [name, setName] = useState("");
  const [player, setPlayer] = useState("");
  const [player2, setPlayer2] = useState("");
  

  useEffect( () =>{axios.get("https://localhost:6001/api/player/names").then(response=>{let toReturn = response.data;setPlayerData(toReturn)})},[]);

  const playerChange = (event) => {
    setPlayer(event.target.value);
    };
  const player2Change = (event) => {
    setPlayer2(event.target.value);
    };
  const nameChange = (event) => {
    setName(event.target.value);
  };
  
  function reset(){
    setPlayer("");
    setPlayer2("");
    setName("");
  };

  function validate(){
    try{
      if (mode === "") throw new Error("You must select the mode to proceed");
      if (mode === "team" && player === player2) throw new Error("You must pick different players");
      if (/[^a-zA-Z0-9]/.test(name)) throw new Error("You can use only alphanumerical characters");
      if (mode === "team" && (player === "" || player2 === "")) throw new Error("Pick both players");
      if (name.length > 20)  throw new Error("Pick a name no longer than 20 characters");
      addNClean()
      }
      catch (error){
        alert (error.message);
      }
    }

  function single()
  {
    document.getElementById("team-mode").style.display = "none";
    document.getElementById("team-mode").style.display = "none";
    setMode("single");
  }

  function teamMode()
  {
    document.getElementById("team-mode").style.display = "inline-block";
    document.getElementById("team-mode").style.display = "inline-block";
    setMode("team");
  }

  function getPlayers(){
    const toReturn = []
     playerData.forEach(player => {(!player.isTeam)? toReturn.push(<MenuItem key={player.playerId} value={player.playerId}>{player.teamPlayerName}</MenuItem>) :void(0)});
     return toReturn
    };

  async function addNClean(){
    try {
      const choices = (mode === "team")? `team,${name},${player},${player2}` : `single,${name},0,0`
       ;
      const insertData =  {"inputstr": choices};
      let config = {headers: {
        'Content-Type': 'application/json'
        }};
      await axios.post("https://localhost:6001/api/player/insert",insertData,config);
      reset();
      axios.get("https://localhost:6001/api/player/names").then(response=>{let toReturn = response.data;setPlayerData(toReturn)});
      alert((mode === "team")? "Team added succesfully!": "Player added succesfully!")
    } 
    catch (error) {
      alert ("Unable to add. Request failed");
    }
  };


  return(
    <>
    <h2>&nbsp;Select the mode first</h2>
    <div>
    <FormControl variant="outlined" className={classes2.formControl}>
        <InputLabel id="select-mode" >Select Mode</InputLabel>
        <Select
          labelId="select-mode"
          id="select-mode"
          value={mode}
        >
          <MenuItem  onClick = {single} value={"single"}>Single Player</MenuItem>
          <MenuItem   onClick = {teamMode} value={"team"}>Team</MenuItem>
        </Select>
      </FormControl>
      <form className={classes.root} noValidate autoComplete="off">
      <TextField value={name} onChange= {nameChange} id="tp-name" label="Insert Name" variant="outlined" />
      </form>
      </div>
      <div id = "team-mode">
        <FormControl id="select-p1f" variant="outlined" className={classes2.formControl}>
        <InputLabel id="select-p1l" >&emsp; Player 1 &emsp;</InputLabel>
        <Select
          labelId="select-p1"
          id="select-p1c"
          value={player}
          onChange={playerChange}
          OnClick= {refresh}
          defaultValue = "None"
          label="Player 1"
        >
          {getPlayers()}
        </Select>
        </FormControl>
        <FormControl id="select-p2f" variant="outlined" className={classes2.formControl}>
        <InputLabel id="select-p2l">&emsp; Player 2 &emsp;</InputLabel>
        <Select
          labelId="select-p2"
          id="select-p2c"
          value={player2}
          defaultValue = "None"
          onChange={player2Change}
          OnClick= {refresh}
          label="Player 2"
        >
          {getPlayers()}
        </Select>
      </FormControl>
     
    </div>
    <div>
      <span>&nbsp;&nbsp;</span>
    <Button variant="contained" color="primary" onClick = {validate}>
        Add Player/Team
    </Button>
    </div>
    </>
  );
};

export default Create