import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dashboard from './DashboardTable';
import TeamvsTeam from './TeamVsTeam';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-inner-${index}`}
      aria-labelledby={`simple-tab-inner-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component ={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Props(index) {
  return {
    id: `simple-tab-inner-${index}`,
    'aria-controls': `simple-tabpanel-inner-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  nice: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InnerTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.nice2}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs inner">
          <Tab label="Scoreboard" {...Props(0)} />
          <Tab label="Confrontations" {...Props(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Dashboard></Dashboard>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TeamvsTeam/>
      </TabPanel>
    </div>
  );
}
