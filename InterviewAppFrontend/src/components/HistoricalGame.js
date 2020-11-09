import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';


function Historical(){  

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
  
  const [team, setTeam] = useState('');
  const [team2, setTeam2] = useState('');
  const [points, setPoints] = useState('');
  const [points2, setPoints2] = useState('');
  const [matchDate, setmatchDate] = useState('');

  useEffect( () =>{axios.get('https://localhost:6001/api/player/names').then(response=>{let toReturn = response.data;setPlayerData(toReturn)})},[]);

  const teamChange = (event) => {
      setTeam(event.target.value);
    };
  const team2Change = (event) => {
      setTeam2(event.target.value);
    };
    const pointsChange = (event) => {
      setPoints(Number(event.target.value));
    };
    const points2Change = (event) => {
      setPoints2(Number(event.target.value));
    };
    const dateChange = (event) => {
    setmatchDate(event.target.value);
    };


  function reset(){
    setTeam('');
    setTeam2('');
    setPoints('');
    setPoints2('');
    setmatchDate('');
  };

  function validate(){
    try{
      if (team === "" || team2 === "") throw new Error("Pick both players");
      if (isNaN(points) || isNaN(points2)) throw new Error("Make sure you input numbers into point fields!");
      if (points === 0 && points2 === 0) throw new Error("At least 1 point needs to be assigned");
      if (points > 11 || points < 0) throw new Error("Points have to be between 0 and 11");
      if (points2 > 11 || points2 < 0) throw new Error("Points have to be between 0 and 11");
      if (team === team2) throw new Error("Players 1 and 2 have to be different");
      if (points === points2) throw new Error("A draw in table football? Huh?");
      if(moment(matchDate).isValid()){  
        const date = new Date(`${matchDate.substring(0,4)}/${matchDate.substring(5,7)}/${matchDate.substring(8)}`)
        date.setHours(date.getHours() + 2)
        if (date.toDate > Date.now()) throw new Error("Warning! You are attempting time travel!")
        addNClean(date)
      } 
      else throw new Error("Invalid date provided");
      }
      catch (error){
        alert (error.message);
      }
    }
  function getMenuItemsh(){
    const toReturn = []
     playerData.forEach(player => { toReturn.push(<MenuItem key={player.playerId} value={player.playerId}>{player.teamPlayerName}</MenuItem>)});
     return toReturn
    };
    async function addNClean(dateInput){
      try {
        const date = dateInput.toISOString().replace('T',' ').replace('Z','');
        const insertData =  {player1:team,player2: team2,player1goals:points,player2goals:points2,gamePlayed:date};
        let config = {headers: {
          'Content-Type': 'application/json'
          }};
        
        await axios.post('https://localhost:6001/api/game/insert',insertData,config);
        await axios.get('https://localhost:6001/api/update');
        reset()
        alert("Game added succesfully!")
      } 
      catch (error) {
        alert ("Unable to add the game. Request failed");
      }
    };


  return(
    <>
    <div>
    <FormControl variant="outlined" className={classes2.formControl}>
        <InputLabel id="select-outlined1h">Team/Player 1</InputLabel>
        <Select
          labelId="select-outlined1selh"
          id="select-outlined1selh"
          value={team}
          onChange={teamChange}
          label="Team"
        >
          {getMenuItemsh()}
        </Select>
      </FormControl>
      <form className={classes.root} noValidate autoComplete="off">
      <TextField value={points} onChange= {pointsChange} id="tp1-points" label="Team/Player 1 Points" variant="outlined" />
      </form>
      </div>
      <div>
        <FormControl variant="outlined" className={classes2.formControl}>
        <InputLabel id="select-outlined2h">Team/Player 2</InputLabel>
        <Select
          labelId="select-outlined2selh"
          id="select-outlined2selh"
          value={team2}
          onChange={team2Change}
          label="Team2"
        >
          {getMenuItemsh()}
        </Select>
      </FormControl>
      <form className={classes.root} noValidate autoComplete="off">
      <TextField  value={points2} onChange= {points2Change} id="tp2-points" label="Team/Player 2 Points" variant="outlined" />
      </form>
    </div>
    <div>
      <form className={classes.root} noValidate autoComplete="off">
      <TextField value={matchDate} onChange= {dateChange}  id="match-date" label="Insert Date YYYY-MM-DD" variant="outlined" />
      </form></div>
    <div>
     <Button variant="contained" color="primary" onClick = {validate}>
        Save the Game
    </Button>

    <span>&emsp;</span>
    <Button variant="contained" onClick = {reset} color="default">
        Reset Points
    </Button>
    </div>
    </>
  );
};

export default Historical