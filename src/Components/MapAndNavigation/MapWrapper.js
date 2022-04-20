import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import { DirectionsRenderer } from 'react-google-maps';
import PropTypes from 'prop-types';
// const google = window.google;

const MapWrapper = ({ markersList }) => {
  // const DirectionsService = new google.maps.DirectionsService();
  // let [directions, setDirections] = useState('');
  const [activeMarker, setActiveMarker] = useState(markersList[0] || null);
  // const origin = { lat: 6.5244, lng: 3.3792 };
  // const destination = { lat: 6.4667, lng: 3.45 };
  //
  // DirectionsService.route(
  //   {
  //     origin: origin,
  //     destination: destination,
  //     travelMode: google.maps.TravelMode.WALKING,
  //     waypoints: [
  // {
  //   location: new google.maps.LatLng(6.4698, 3.5852)
  // },
  // {
  //   location: new google.maps.LatLng(6.6018, 3.3515)
  // }
  //     ]
  //   },
  //   (result, status) => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       console.log(result);
  //       setDirections(result);
  //     } else {
  //       console.error(`error fetching directions ${result}`);
  //     }
  //   }
  // );

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
      {/*{directions && <DirectionsRenderer directions={directions} />}*/}
    </Map>
  );
};

MapWrapper.propTypes = {
  markersList: PropTypes.arrayOf(PropTypes.any)
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDMjp7jW15YcB1uZv5vDGspW9hySRumyZ4'
})(MapWrapper);
