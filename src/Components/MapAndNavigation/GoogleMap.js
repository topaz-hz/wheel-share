import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GoogleMap.css';
import * as HazardUtils from '../../Utils/hazardUtils';
import Button from '@material-ui/core/Button';
import MarkerInfoWindow from './MarkerInfoWindow';
import MapLegend from './MapLegend';

const GoogleMap = ({
  directions,
  setDirections,
  markersList,
  currentLocation,
  activeMarker,
  setActiveMarker,
  updateCurrentLocation
}) => {
  const google = window.google;
  let directionsRenderer = new google.maps.DirectionsRenderer();

  const [map, setMap] = useState();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [currPopup, setCurrPopup] = useState(null);
  const [infoDiv, setInfoDiv] = useState(null);

  useEffect(() => {
    setGoogleMap();
    setInfoDiv(document.getElementById('info'));
  }, []);

  useEffect(() => {
    if (map && activeMarker) {
      map.setCenter(activeMarker.coordinates);
    }
  }, [activeMarker]);

  useEffect(() => {
    if (directions) {
      directionsRenderer.setDirections(directions);
    }
  }, [directions]);

  const setGoogleMap = () => {
    setMap(
      new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: currentLocation ? currentLocation : markersList[0]?.coordinates,
        disableDefaultUI: true
      })
    );
  };

  const initMap = () => {
    if (!map) return;

    class Popup extends google.maps.OverlayView {
      position;
      containerDiv;
      constructor(position, content) {
        super();
        this.position = position;
        //TODO: fix content is null
        content.classList.add('popup-bubble');

        // This zero-height div is positioned at the bottom of the bubble.
        const bubbleAnchor = document.createElement('div');

        bubbleAnchor.classList.add('popup-bubble-anchor');
        bubbleAnchor.appendChild(content);
        // This zero-height div is positioned at the bottom of the tip.
        this.containerDiv = document.createElement('div');
        this.containerDiv.classList.add('popup-container');
        this.containerDiv.appendChild(bubbleAnchor);
        // Optionally stop clicks, etc., from bubbling up to the map.
        Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
      }
      /** Called when the popup is added to the map. */
      onAdd() {
        setShowInfoWindow(true);
        this.getPanes().floatPane.appendChild(this.containerDiv);
      }
      /** Called when the popup is removed from the map. */
      onRemove() {
        if (this.containerDiv.parentElement) {
          this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
        setShowInfoWindow(false);
      }
      /** Called each frame when the popup needs to draw itself. */
      draw() {
        const divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
        // Hide the popup when it is far out of view.
        const display =
          Math.abs(divPosition.x) < 10 && Math.abs(divPosition.y) < 10 ? 'block' : 'none';
        if (display === 'block') {
          this.containerDiv.style.left = divPosition.x + 'px';
          this.containerDiv.style.top = divPosition.y + 'px';
        }

        if (this.containerDiv.style.display !== display) {
          this.containerDiv.style.display = display;
        }
      }
    }

    markersList.map((marker) => {
      const currMarker = new google.maps.Marker({
        position: marker.coordinates,
        map,
        icon: HazardUtils.getSvgMarker(google, marker.hazardType)
      });
      currMarker.addListener('click', () => {
        setActiveMarker({ ...marker });
        createPopup(marker);
      });
    });

    if (currentLocation) {
      new google.maps.Marker({
        position: currentLocation,
        map,
        icon: HazardUtils.getSvgMarker(google, 'currentLocation')
      });
    }

    const createPopup = (marker) => {
      const popup = new Popup(new google.maps.LatLng(marker.coordinates), infoDiv);
      setCurrPopup(popup);
      popup.setMap(map);
    };

    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('sidebar'));

    const control = document.getElementById('floating-panel');

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  };

  window.initMap = initMap();

  const closeInfoWindow = () => {
    currPopup.setMap(null);
    setActiveMarker(null);
  };

  const clearDirections = () => {
    directionsRenderer.setPanel(null);
    directionsRenderer.setMap(null);
  };

  return (
    <>
      <Button
        variant="contained"
        color="default"
        onClick={() => {
          setDirections(null);
          clearDirections();
        }}
        style={{ marginBottom: 10, marginRight: 10 }}>
        Restart Navigation
      </Button>
      <Button
        variant="contained"
        color="default"
        onClick={() => updateCurrentLocation()}
        style={{ marginBottom: 10 }}>
        Find My Location
      </Button>
      <div id="container" className="container">
        <div id="map" className="map" />
        {/*TODO (Topaz): fix sidebar*/}
        <div id="sidebar" className="sidebar" />
        <div
          id="info"
          className=""
          style={{
            visibility: showInfoWindow ? 'visible' : 'hidden',
            width: showInfoWindow ? 150 : 0
          }}>
          <MarkerInfoWindow activeMarker={activeMarker} onClose={closeInfoWindow} />
        </div>
      </div>
      <MapLegend />
    </>
  );
};

GoogleMap.propTypes = {
  markersList: PropTypes.arrayOf(PropTypes.any),
  activeMarker: PropTypes.any,
  setActiveMarker: PropTypes.func,
  directions: PropTypes.any,
  setDirections: PropTypes.func,
  currentLocation: PropTypes.any,
  updateCurrentLocation: PropTypes.func
};

export default GoogleMap;
