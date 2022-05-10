/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import PlacesAutocomplete from './LocationSearchInput.js';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const NavigationForm = ({ setDirections }) => {
  const classes = useStyles();

  const [startAddress, setStartAddress] = React.useState('');
  const [endAddress, setEndAddress] = React.useState('');

  const searchDirections = () => {
    console.log(startAddress);
    console.log(endAddress);
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(startAddress),
        destination: new window.google.maps.LatLng(endAddress),
        travelMode: window.google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.warn(`error fetching directions ${status}`);
        }
      }
    );
  };

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
              alignItems: 'baseline',
              margin: 'auto',
              verticalAlign: 'middle'
            }}>
            <div style={{ width: 600 }}>
              <PlacesAutocomplete
                setGeolocation={setStartAddress}
                setAddress={() => {}}
                label={'From'}
                customStyle={{ id: 'outlined-basic', variant: 'outlined' }}
              />
              <PlacesAutocomplete
                setGeolocation={setEndAddress}
                setAddress={() => {}}
                label={'To'}
                customStyle={{ id: 'outlined-basic', variant: 'outlined' }}
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={searchDirections}
            style={{ margin: '30px 0', width: 300 }}>
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
