import React from 'react';
import * as HazardUtils from '../Utils/hazardUtils';
import * as dbUtils from '../Utils/databaseUtils';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { Switch, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    fontFamily: 'Arial, Helvetica, sans-serif'
  }
});

const HazardList = ({ hazardsList, setActiveMarker }) => {
  const classes = useStyles();
  //TODO: change to paginated table
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {HazardUtils.hazardListColumns.map((column, index) => (
              <TableCell key={index} align="center">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {hazardsList.map((hazard) => (
            <TableRow
              key={hazard.hazardType}
              //TODO (Topaz): make sure this works
              onClick={() => setActiveMarker(hazard)}
              style={{ cursor: 'pointer' }}>
              <TableCell component="th" scope="row">
                {HazardUtils.markerText[hazard.hazardType]}
              </TableCell>
              <TableCell align="left">{hazard.location}</TableCell>
              <TableCell align="center">{hazard.dateUpdated}</TableCell>
              <TableCell align="center">
                <Switch
                  checked={hazard.treated}
                  onChange={(e) => {
                    e.preventDefault();
                    dbUtils.updateHazard(hazard, !hazard.treated);
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
              {hazard.info ? (
                <TableCell align="center">
                  <Tooltip title={hazard.info}>
                    <img
                      alt="info icon"
                      src="https://www.svgrepo.com/show/24584/info-icon.svg"
                      // intrinsicsize="512 x 512"
                      width="20"
                      height="20"
                    />
                  </Tooltip>
                </TableCell>
              ) : (
                <TableCell />
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

HazardList.propTypes = {
  hazardsList: PropTypes.arrayOf(PropTypes.any),
  setActiveMarker: PropTypes.func
};
export default HazardList;
