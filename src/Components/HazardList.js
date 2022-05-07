import React from 'react';
import * as HazardUtils from '../Utils/hazardUtils';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(hazardType, location, updatedDate) {
  return { hazardType, location, updatedDate };
}

const rows = [
  createData('Hole in the sidewalk', 'Address', '6.5.2022'),
  createData('Narrow street', 'Address', '6.5.2022'),
  createData('Car blocks the street', 'Address', '6.5.2022'),
  createData('Street close for infrastructure work', 'Address', '6.5.2022'),
  createData('Curb is no accessible', 'Address', '6.5.2022'),
  createData('Inaccessible Stairs', 'Address', '6.5.2022')
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {HazardUtils.hazardListColumns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
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
              <TableCell align="left">{row.updatedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
