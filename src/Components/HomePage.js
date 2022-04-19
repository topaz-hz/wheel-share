import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import NavigationForm from './MapAndNavigation/NavigationForm';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
    margin: '10px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  footer: {
    position: 'fixed',
    bottom: '0',
    left: 0,
    height: '50px',
    width: '100%',
    backgroundColor: 'lightblue'
  }
}));

export default function HomePage() {
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
          <Grid item xs={6}>
            <Paper className={classes.paper}>Put hazards list component here</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>Put hazard form component here</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <NavigationForm />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Put map component here</Paper>
          </Grid>
        </Grid>
        <div className={classes.footer}>Put footer component here</div>
      </Container>
    </>
  );
}
