import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

function LiveGame(){  

  const [playerData,setPlayerData] = useState([]);


  useEffect( () =>{axios.get('https://localhost:6001/api/player/names').then(response=>{let toReturn = response.data;setPlayerData(toReturn)})},[]);

  const useStyles = makeStyles((theme) => (
  {
  margin: {margin: theme.spacing(1),fontSize: 30},
  extendedIcon: {marginRight: theme.spacing(1),},
  
  }));
  const useStyles2 = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),fontSize: 30,
      minWidth: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const classes2 = useStyles2(); 
  
  const [team, setTeam] = useState('');
  const [team2, setTeam2] = useState('');
  const [points, setPoints] = useState(0);
  const [points2, setPoints2] = useState(0);
  //const [res, setRes]= useState('');

  const handleChange = (event) => {
      setTeam(event.target.value);
    };
  const handleChange2 = (event) => {
      setTeam2(event.target.value);
    };
  
  function getMenuItems(){
    const toReturn = []
     playerData.forEach(player => { toReturn.push(<MenuItem key={player.playerId} value={player.playerId}>{player.teamPlayerName}</MenuItem>)});
     return toReturn
    };

  
  function decrementPoints1(){
    if (points === 0){}
    else
    {
      setPoints(prevPoints => prevPoints -1)
    }
  };
  function incrementPoints1(){  
    if (points >= 11){}
    else{setPoints(prevPoints => prevPoints + 1);}
  };

  function decrementPoints2(){
    if (points2 === 0){}
    else{setPoints2(prevPoints => prevPoints -1)}
    };

  function incrementPoints2(){
    if (points2 >= 11){}
    else{setPoints2(prevPoints => prevPoints + 1)}
  };

  function resetP(){
    setPoints(0);
    setPoints2(0);
  };

  function validate(){
    try{
      if (team === "" || team2 === "") throw new Error("Pick both players");
      if (points === 0 && points2 === 0) throw new Error("At least 1 point needs to be assigned");
      if (team === team2) throw new Error("Players 1 and 2 have to be different");
      if (points === points2) throw new Error("A draw in table football? Huh?");
      addNClean();
      }
      catch (error){
        alert (error.message);
      }
  };

  async function addNClean(){
    try {
      const date = new Date(Date.now()).toISOString().replace('T',' ').replace('Z','');
      const insertData =  {player1:team,player2: team2,player1goals:points,player2goals:points2,gamePlayed:date};
      let config = {headers: {
        'Content-Type': 'application/json'
        }};
      
      await axios.post('https://localhost:6001/api/game/insert',insertData,config);
      await axios.get('https://localhost:6001/api/update');
      resetP()
      alert("Game added succesfully!")
    } 
    catch (error) {
      alert ("Unable to add the game. Check if teams contain repeating players");
    }
  };

  return(
    <>
    <div>
    <FormControl variant="outlined" className={classes2.formControl}>
        <InputLabel id="select-outlined1">Team/Player 1</InputLabel>
        <Select
          labelId="select-outlined1sel"
          id="select-outlined1sel"
          value={team}
          onChange={handleChange}
          label="Team"
        >
          {getMenuItems()}
        </Select>
      </FormControl>
      <Button size="large"  onClick = {decrementPoints1} className={classes.margin}>
      -
      </Button>
      <span className={classes.margin}>{points}</span>
      <Button size="large" onClick = {incrementPoints1} className={classes.margin}>
      +
      </Button>
      <div>
      <span className={classes.margin}>&emsp;&emsp;&emsp;VS </span>
      </div>
      </div>
      <div>
      <FormControl variant="outlined" className={classes2.formControl}>
        <InputLabel id="select-outlined2">Team/Player 2</InputLabel>
        <Select
          labelId="select-outlined2sel"
          id="select-outlined2sel"
          value={team2}
          onChange={handleChange2}
          label="Team2"
        >
          {getMenuItems()}
        </Select>
      </FormControl>
      <Button size="large" onClick = {decrementPoints2} className={classes.margin}>
      -
      </Button>
      <span className={classes.margin}>{points2}</span>
      <Button size="large" onClick = {incrementPoints2} className={classes.margin}>
      +
      </Button>
    </div>
    <div>
     <Button variant="contained" color="primary" onClick = {validate}>
        Save the Game
    </Button>

    <span>&emsp;</span>
    <Button variant="contained" onClick = {resetP} color="default">
        Reset Points
    </Button>
    </div>
    </>
  );
};

export default LiveGame