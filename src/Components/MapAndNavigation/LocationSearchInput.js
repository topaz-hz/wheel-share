import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import PropTypes from 'prop-types';
import { MenuItem, TextField } from '@material-ui/core';

const PlacesAutocomplete = ({ setAddress, setGeolocation, label, customStyle }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => {
          setAddress(results[0].formatted_address);
          return getLatLng(results[0]);
        })
        .then(({ lat, lng }) => {
          setGeolocation({ lat, lng });
        })
        .catch((error) => {
          console.log('😱 Error: ', error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <MenuItem key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong>
          <small>&nbsp;&nbsp;&nbsp;{secondary_text}</small>
        </MenuItem>
      );
    });

  return (
    <div ref={ref}>
      <TextField
        autoFocus
        margin="dense"
        type="address"
        fullWidth
        onChange={handleInput}
        disabled={!ready}
        value={value}
        label={label}
        id={customStyle?.id}
        variant={customStyle?.variant}
      />
      {status === 'OK' && (
        <ul
          style={{
            padding: '2px 5px',
            position: 'absolute',
            width: '600px',
            marginTop: -15,
            marginLeft: -5,
            backgroundColor: 'white',
            zIndex: 999
          }}>
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};

PlacesAutocomplete.propTypes = {
  setAddress: PropTypes.func,
  setGeolocation: PropTypes.func,
  label: PropTypes.string,
  customStyle: PropTypes.object
};

export default PlacesAutocomplete;
