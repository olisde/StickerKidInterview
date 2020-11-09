import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LiveGame from './LiveGame'
import InnerTabs from './InnerDashboard';
import Historical from './HistoricalGame';
import Create from './CreatePlayer'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  nice: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.nice}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label= "Create Players"{...Props(0)} />
          <Tab label="Live Game" {...Props(1)} />
          <Tab label="Historical Game" {...Props(2)} />
          <Tab label="Dashboard" {...Props(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Create/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LiveGame/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Historical/> 
      </TabPanel>
      <TabPanel value={value} index={3}>
        <InnerTabs/>
      </TabPanel>
    </div>
  );
}
