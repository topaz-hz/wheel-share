import React from 'react';
import { Button } from '@material-ui/core';
import thumbsUp from './thumbsUp.svg';
import thumbsDown from './thumbsDown.svg';
import PropTypes from 'prop-types';
import * as HazardUtils from '../../Utils/hazardUtils';
import * as dbUtils from '../../Utils/databaseUtils';

const MarkerInfoWindow = ({ activeMarker }) => {
  return (
    <div id={'infoContent'}>
      {activeMarker?.hazardType === 'currentLocation' ? (
        <div>
          <h3>You are here :)</h3>
        </div>
      ) : (
        <div>
          <p>
            <strong>Hazard: </strong>
            {HazardUtils.markerText[activeMarker?.hazardType]}
          </p>
          {activeMarker?.info && (
            <p>
              <strong>Info: </strong>
              {activeMarker?.info}
            </p>
          )}
          <p>
            <strong>Still There? </strong>
          </p>
          <Button
            color="primary"
            style={{ width: 30, height: 30 }}
            onClick={(e) => {
              e.preventDefault();
              dbUtils.updateHazard(activeMarker, false);
            }}>
            <img src={thumbsUp} />
          </Button>
          <Button
            color="primary"
            style={{ width: 30, height: 30 }}
            onClick={(e) => {
              e.preventDefault();
              dbUtils.updateHazard(activeMarker, true);
            }}>
            <img src={thumbsDown} />
          </Button>
        </div>
      )}
    </div>
  );
};

MarkerInfoWindow.propTypes = {
  activeMarker: PropTypes.any
};

export default MarkerInfoWindow;
