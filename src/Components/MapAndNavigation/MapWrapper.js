import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { InfoWindow, Map, Marker } from 'google-maps-react';
const {
  // withScriptjs,
  // withGoogleMap,
  // GoogleMap,
  DirectionsRenderer
} = require('react-google-maps');
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as HazardUtils from '../../Utils/hazardUtils';
import MapLegend from './MapLegend';
import MarkerInfoWindow from './MarkerInfoWindow';

const MapWrapper = ({
  markersList,
  activeMarker,
  setActiveMarker,
  directions,
  currentLocation,
  updateCurrentLocation
}) => {
  const google = window.google;
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const [showInfoWindow, setShowInfoWindow] = useState(false);

  useEffect(() => {
    directionsRenderer.setDirections(directions);
    const map = new google.maps.Map(document.getElementById('map'), { zoom: 7 });
    directionsRenderer.setMap(map);
    // directionsRenderer.setPanel(document.getElementById('directionsPanel'));
  }, [directions]);

  const onMarkerClick = (marker) => {
    setShowInfoWindow(true);
    setActiveMarker(marker);
  };

  // eslint-disable-next-line no-unused-vars
  const onInfoWindowOpen = (e) => {
    const container = document.getElementById('infoWindowContent');
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(<MarkerInfoWindow activeMarker={activeMarker} />);
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
        id="map"
        google={google}
        zoom={14}
        initialCenter={currentLocation ? currentLocation : markersList[0]?.coordinates}
        center={activeMarker ? activeMarker?.coordinates : currentLocation}
        style={{
          width: 'calc(100% - 32px)',
          height: '430px',
          position: 'relative'
        }}
        onClick={() => {
          setActiveMarker(null);
          setShowInfoWindow(false);
        }}>
        {currentLocation ? (
          <Marker
            position={currentLocation}
            onClick={() =>
              onMarkerClick({ hazardType: 'currentLocation', coordinates: currentLocation })
            }
            name={'My Location'}
            icon={HazardUtils.getSvgMarker(google, 'currentLocation')}
          />
        ) : null}
        {markersList.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.coordinates}
            onClick={() => onMarkerClick(marker)}
            name={marker.hazardType}
            icon={HazardUtils.getSvgMarker(google, marker.hazardType)}></Marker>
        ))}
        <InfoWindow
          visible={showInfoWindow}
          position={activeMarker?.coordinates}
          pixelOffset={new google.maps.Size(0, -20)}
          onOpen={(e) => {
            onInfoWindowOpen(e);
          }}>
          <div id="infoWindowContent" />
        </InfoWindow>
        {/*  TODO: make sure this is the correct way to render directions on map*/}
        {!!directions && <DirectionsRenderer directions={directions} />}
        {/*{console.log(directions)}*/}
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
