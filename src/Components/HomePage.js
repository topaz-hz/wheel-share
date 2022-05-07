import React, { useEffect, useState } from 'react';
import NavigationForm from './MapAndNavigation/NavigationForm';
import MapWrapper from './MapAndNavigation/MapWrapper';
import HazardList from './HazardList';
import HazardForm from './HazardForm';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const markersList = [
  { id: 1, position: { lat: 32.07, lng: 34.777 }, type: 'step' },
  { id: 2, position: { lat: 32.08, lng: 34.775 }, type: 'bikeBlocking' },
  { id: 3, position: { lat: 32.075, lng: 34.774 }, type: 'carBlocking' },
  { id: 4, position: { lat: 32.072, lng: 34.774 }, type: 'narrowSidewalk' },
  { id: 5, position: { lat: 32.08, lng: 34.774 }, type: 'other' }
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  container: {
    height: '100vh',
    width: '100vw',
    textAlign: 'center',
    fontFamily: 'Trebuchet MS, Helvetica, sans-serif'
  },
  grid: {
    margin: '5px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const updateCurrentLocation = (callback = () => {}) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = pos.coords;
      setCurrentLocation({ lat: coords.latitude, lng: coords.longitude });
    });
    callback();
  };

  useEffect(() => {
    updateCurrentLocation();
  }, []);

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container className={classes.container}>
        <Grid className={classes.grid} container spacing={3}>
          <Grid item xs={12}>
            <h1 style={{ color: 'darkblue', fontSize: '42px' }}>WheelShare</h1>
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <HazardForm />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <HazardList />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <NavigationForm />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ height: 600, position: 'relative' }}>
              <MapWrapper
                markersList={markersList}
                directions={directions}
                currentLocation={currentLocation}
                updateCurrentLocation={updateCurrentLocation}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
