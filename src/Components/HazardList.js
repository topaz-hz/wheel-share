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

const HazardList = ({ hazardsList }) => {
  const classes = useStyles();
  const rows = hazardsList;

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
          {rows.map((row) => (
            <TableRow key={row.hazardType}>
              <TableCell component="th" scope="row">
                {HazardUtils.markerText[row.hazardType]}
              </TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="center">{row.dateUpdated}</TableCell>
              <TableCell align="center">
                <Switch
                  checked={row.treated}
                  onChange={(e) => {
                    e.preventDefault();
                    dbUtils.updateHazard(row, !row.treated);
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
              {row.info ? (
                <TableCell align="center">
                  <Tooltip title={row.info}>
                    <img
                      src="https://www.svgrepo.com/show/24584/info-icon.svg"
                      intrinsicsize="512 x 512"
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
  hazardsList: PropTypes.arrayOf(PropTypes.any)
};
export default HazardList;
