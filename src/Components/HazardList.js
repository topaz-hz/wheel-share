import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(hazard, address, reporting_date) {
  return { hazard, address, reporting_date };
}

const rows = [
  createData('Hole in the sidewalk', 'Address', '6-5-2022'),
  createData('Narrow street', 'Address', '6-5-2022'),
  createData('Car blocks the street', 'Address', '6-5-2022'),
  createData('Street close for infrastructure work', 'Address', '6-5-2022'),
  createData('Curb is no accessible', 'Address', '6-5-2022'),
  createData('Inaccessible Stairs', 'Address', '6-5-2022')
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hazard</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Reporting date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.hazard}>
              <TableCell component="th" scope="row">
                {row.hazard}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.reporting_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
