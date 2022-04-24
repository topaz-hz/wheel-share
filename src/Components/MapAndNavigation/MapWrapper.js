import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Button from '@material-ui/core/Button';
import { DirectionsRenderer } from 'react-google-maps';
import PropTypes from 'prop-types';

const MapWrapper = ({ markersList, directions, currentLocation, updateCurrentLocation }) => {
  const [activeMarker, setActiveMarker] = useState(null);

  const onMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  const svgMarker = {
    path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
    fillColor: 'blue',
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new window.google.maps.Point(15, 30)
  };

  return (
    <>
      <Button onClick={() => updateCurrentLocation(setActiveMarker(null))}>Find My Location</Button>
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
        {currentLocation ? (
          <Marker
            position={currentLocation}
            onClick={() => onMarkerClick({ position: currentLocation })}
            name={'My Location'}
            icon={svgMarker}
          />
        ) : null}
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
  directions: PropTypes.any,
  currentLocation: PropTypes.any,
  updateCurrentLocation: PropTypes.func
};

export default GoogleApiWrapper({
  apiKey: 'GOOGLE_API_KEY'
})(MapWrapper);
