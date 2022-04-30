import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

// eslint-disable-next-line no-unused-vars
const NavigationForm = ({ setDirections }) => {
  //TODO: use setDirections as follows: if new directions to show on map is \
  // 'directions_new' call function setDirections(directions_new) \
  // directions prop will then be updated in mapWrapper component to render on map
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Plan a Trip
      <div>
        <label htmlFor="contained-button-file">
          <TextField id="outlined-basic" label="Start" variant="outlined" size="small" />
          <TextField id="outlined-basic" label="End" variant="outlined" size="small" />
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={() => window.console.log('go button was clicked')}>
            Go!
          </Button>
        </label>
      </div>
    </div>
  );
};

NavigationForm.propTypes = {
  setDirections: PropTypes.func
};

export default NavigationForm;
