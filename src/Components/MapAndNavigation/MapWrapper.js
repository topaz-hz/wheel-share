import React, { useEffect, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Button from '@material-ui/core/Button';
import { DirectionsRenderer } from 'react-google-maps';
import PropTypes from 'prop-types';

const MapWrapper = ({ markersList, directions }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const updateCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = pos.coords;
      setCurrentLocation({ lat: coords.latitude, lng: coords.longitude });
    });
    setActiveMarker(null);
  };

  useEffect(() => {
    updateCurrentLocation();
  }, []);

  const onMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  return (
    <>
      <Button onClick={updateCurrentLocation}>Find My Location</Button>
      <Map
        google={window.google}
        zoom={14}
        initialCenter={currentLocation ? currentLocation : markersList[0]?.position}
        center={activeMarker ? activeMarker?.position : currentLocation}
        style={{
          width: '1200px',
          height: '410px',
          position: 'relative'
        }}>
        {currentLocation &
        (
          <Marker
            position={currentLocation}
            onClick={() => onMarkerClick({ position: currentLocation })}
            name={'My Location'}
            // icon={custom icon for my location}
          />
        )}
        {markersList.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => onMarkerClick(marker)}
            name={'Location 1'}
            //TODO: different icons for severity of hazard or types of hazard?
            // icon={markerTypes[marker.type]}
          />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </Map>
    </>
  );
};

MapWrapper.propTypes = {
  markersList: PropTypes.arrayOf(PropTypes.any),
  directions: PropTypes.any
};

export default GoogleApiWrapper({
  apiKey: 'GOOGLE_API_KEY'
})(MapWrapper);
