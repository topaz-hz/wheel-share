import React, { useEffect, useState } from 'react';
import NavigationForm from './MapAndNavigation/NavigationForm';
import MapWrapper from './MapAndNavigation/MapWrapper';
import HazardList from './HazardList';
import HazardForm from './HazardForm';
import { qTimeOrder, db } from '../index';

import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Divider, Grid, Paper } from '@material-ui/core';
import { onSnapshot } from 'firebase/firestore';

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
  const [hazards, setHazards] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(qTimeOrder, (snapshot) => {
      let updatedHazards = [];
      snapshot.docs.forEach((doc) => {
        updatedHazards.push({ ...doc.data(), id: doc.id });
      });
      console.log(updatedHazards);
      setHazards(updatedHazards);
    });
    return () => {
      unsubscribe();
    };
  }, [db]);

  const updateCurrentLocation = (callback = () => {}) => {
    window.console.log(hazards);
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
              {hazards && <HazardList hazardsList={hazards} setActiveMarker={setActiveMarker} />}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <NavigationForm setDirections={setDirections} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ height: 600, position: 'relative' }}>
              {hazards && (
                <MapWrapper
                  markersList={hazards}
                  activeMarker={activeMarker}
                  setActiveMarker={setActiveMarker}
                  directions={directions}
                  currentLocation={currentLocation}
                  updateCurrentLocation={updateCurrentLocation}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
