import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GoogleMap.css';
import * as HazardUtils from '../../Utils/hazardUtils';

const GoogleMap = ({ directions, markersList, currentLocation }) => {
  const google = window.google;
  const directionsRenderer = new google.maps.DirectionsRenderer();

  // eslint-disable-next-line no-unused-vars
  const [currDirections, setCurrDirections] = useState(directions);
  const [map, setMap] = useState();

  useEffect(() => {
    setMap(
      new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: currentLocation ? currentLocation : markersList[0]?.coordinates,
        disableDefaultUI: true
      })
    );
  }, []);

  useEffect(() => {
    if (map) {
      initMap();
    }
  }, [map]);

  useEffect(() => {
    window.console.log('directions', directions);
    if (directions) {
      directionsRenderer.setDirections(directions);
      setCurrDirections(directions);
      initMap();
    }
  }, [directions]);

  const initMap = () => {
    if (!map) return;

    new google.maps.Marker({
      position: currentLocation.coordinates,
      map,
      icon: HazardUtils.getSvgMarker(google, currentLocation.hazardType)
    });

    markersList.map((marker) => {
      new google.maps.Marker({
        position: marker.coordinates,
        map,
        icon: HazardUtils.getSvgMarker(google, marker.hazardType)
      });
    });

    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('sidebar'));

    const control = document.getElementById('floating-panel');

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  };

  window.initMap = initMap;

  return (
    <>
      <div id="container" className="container">
        <div id="map" className="map" />
        <div id="sidebar" className="sidebar" />
      </div>
    </>
  );
};

GoogleMap.propTypes = {
  markersList: PropTypes.arrayOf(PropTypes.any),
  activeMarker: PropTypes.any,
  setActiveMarker: PropTypes.func,
  directions: PropTypes.any,
  currentLocation: PropTypes.any,
  updateCurrentLocation: PropTypes.func
};

export default GoogleMap;
