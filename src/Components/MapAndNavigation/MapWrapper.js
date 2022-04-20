import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const MapWrapper = ({ markersList }) => {
  const [activeMarker, setActiveMarker] = useState(markersList[0] || null);

  const onMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  return (
    <Map
      google={window.google}
      zoom={14}
      initialCenter={activeMarker?.position}
      center={activeMarker?.position}
      style={{
        width: '1200px',
        height: '468px',
        position: 'relative'
      }}>
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
    </Map>
  );
};

MapWrapper.propTypes = {
  markersList: PropTypes.arrayOf(PropTypes.any)
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDMjp7jW15YcB1uZv5vDGspW9hySRumyZ4'
})(MapWrapper);
