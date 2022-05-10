import React from 'react';
import { Map, Marker } from 'google-maps-react';
import Button from '@material-ui/core/Button';
import { DirectionsRenderer } from 'react-google-maps';
import PropTypes from 'prop-types';
import * as HazardUtils from '../../Utils/hazardUtils';
import MapLegend from './MapLegend';

const MapWrapper = ({
  markersList,
  activeMarker,
  setActiveMarker,
  directions,
  currentLocation,
  updateCurrentLocation
}) => {
  const google = window.google;

  const onMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  return (
    <>
      <Button
        variant="contained"
        color="default"
        onClick={() => updateCurrentLocation(setActiveMarker(null))}
        style={{ marginBottom: 10 }}>
        Find My Location
      </Button>
      <Map
        google={google}
        zoom={14}
        initialCenter={currentLocation ? currentLocation : markersList[0]?.coordinates}
        center={activeMarker ? activeMarker?.coordinates : currentLocation}
        style={{
          width: 'calc(100% - 32px)',
          height: '430px',
          position: 'relative'
        }}>
        {currentLocation ? (
          <Marker
            position={currentLocation}
            onClick={() => onMarkerClick({ position: currentLocation })}
            name={'My Location'}
            icon={HazardUtils.getSvgMarker(google, 'currentLocation')}
          />
        ) : null}
        {markersList.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.coordinates}
            onClick={() => onMarkerClick(marker)}
            name={'Location 1'}
            icon={HazardUtils.getSvgMarker(google, marker.hazardType)}
          />
        ))}
        {/*  TODO: make sure this is the correct way to render directions on map*/}
        {directions && <DirectionsRenderer directions={directions} />}
        {console.log(directions)}
      </Map>
      <MapLegend />
    </>
  );
};

MapWrapper.propTypes = {
  markersList: PropTypes.arrayOf(PropTypes.any),
  activeMarker: PropTypes.any,
  setActiveMarker: PropTypes.func,
  directions: PropTypes.any,
  currentLocation: PropTypes.any,
  updateCurrentLocation: PropTypes.func
};

export default MapWrapper;
// export default GoogleApiWrapper({
//   apiKey: 'apikey'
// })(MapWrapper);
