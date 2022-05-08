/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import PlacesAutocomplete from './LocationSearchInput.js';
import { GoogleMap } from 'react-google-maps';

// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

// eslint-disable-next-line no-unused-vars
const NavigationForm = ({
  setLineCoordinates,
  setStartAddress,
  setEndAddress,
  searchDirections
}) => {
  //TODO: use setDirections as follows: if new directions to show on map is \
  // 'directions_new' call function setDirections(directions_new) \
  // directions prop will then be updated in mapWrapper component to render on map
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ alignItems: 'center' }}>
      Plan a Trip
      <div>
        <label htmlFor="contained-button-file">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'baseline'
            }}>
            <PlacesAutocomplete setAddress={setStartAddress}></PlacesAutocomplete>
            <PlacesAutocomplete setAddress={setEndAddress}></PlacesAutocomplete>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={searchDirections}
              style={{ marginLeft: '10px' }}>
              Go!
            </Button>
          </div>
        </label>
      </div>
    </div>
  );
};

NavigationForm.propTypes = {
  setLineCoordinates: PropTypes.func,
  setStartAddress: PropTypes.func,
  setEndAddress: PropTypes.func,
  searchDirections: PropTypes.func
};

export default NavigationForm;
