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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    fontFamily: 'Arial, Helvetica, sans-serif'
  }
});

function createData(hazardType, location, updatedDate, isTreated, moreInfo = null) {
  return { hazardType, location, updatedDate, moreInfo, isTreated };
}

const rows = [
  createData('Hole in the sidewalk', 'Address', '6.5.2022', false),
  createData('Car blocks the street', 'Address', '6.5.2022', false),
  createData(
    'Street close for infrastructure work',
    'Address',
    '6.5.2022',
    false,
    'More info text is here'
  ),
  createData(
    'Narrow street',
    'Address',
    '6.5.2022',
    true,
    'There is plenty of info here because someone wrote a lot of text'
  ),
  createData('Curb is no accessible', 'Address', '6.5.2022', false),
  createData('Inaccessible Stairs', 'Address', '6.5.2022', true)
];

export default function BasicTable() {
  const classes = useStyles();

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
                {row.hazardType}
              </TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="center">{row.updatedDate}</TableCell>
              <TableCell align="center">
                <Switch
                  checked={row.isTreated}
                  onChange={() => dbUtils.updateHazard(!row.isTreated)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
              {row.moreInfo ? (
                <TableCell align="center">
                  <Tooltip title={row.moreInfo}>
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
}
