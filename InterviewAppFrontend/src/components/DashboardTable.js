import * as axios from 'axios';
import React, {useState,useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';


function Dashboard() {


const [inputRows,setInputRows] = useState([]);   

useEffect(()=> {getAllPlayers();
},[]);

 const handleRefresh = (event) => {
  getAllPlayers();
    };
async function getAllPlayers()
{
    const req = await axios.get('https://localhost:6001/api/player');
    const arrayOfObj = req.data;
    const newKey = 'id'
    const newArrayOfObj = arrayOfObj.map(({ playerId, ...rest }) => ({ [newKey]: playerId, ...rest }));
    setInputRows(newArrayOfObj);
}


const columns = [
  {field: 'id', headerName: 'id', width: 160, hide: true },
  {field: 'teamPlayerName', headerName: 'Team/Player Name', width: 160 },
  {field: 'totalGames', headerName: 'Total Games', type: 'number', width: 130 },
  {field: 'wins', headerName: 'Wins',type: 'number', width: 90},
  {field: 'losses', headerName: 'Losses', type: 'number', width: 90},
  {field: 'ratio', headerName: 'W/L Ratio', type: 'number', width: 130},
  {field: 'gf', headerName: 'Goals For', type: 'number', width: 130},
  {field: 'ga', headerName: 'Goals Against', type: 'number', width: 130},
  {field: 'gd', headerName: 'Difference', type: 'number',width: 130},
  {field: 'isTeam', headerName: 'Team', type: 'bool',width: 130}
];

  return (
    <>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={inputRows} columns={columns} pageSize={10} checkboxSelection = {false} />
    </div>
    <div>
      <Button variant="contained" color="primary" onClick = {handleRefresh}>
          Refresh Data
      </Button>
    </div>
    </>
  );
}

export default Dashboard
