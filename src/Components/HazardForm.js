import React, { useState } from 'react';
import * as dbUtils from '../Utils/databaseUtils';
import * as MapUtils from '../Utils/hazardUtils';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField
} from '@material-ui/core';
import { InputLabel, NativeSelect } from '@mui/material';

export default function FormDialog() {
  const [hazardType, setHazardType] = useState(null);
  const [location, setLocation] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [coordinates, setCoordinates] = useState(null);
  const [moreInfo, setMoreInfo] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setHazardType(null);
    setLocation(null);
    // setCoordinates(null);
    setMoreInfo(null);
    setOpen(false);
  };

  const handleSubmitHazard = () => {
    dbUtils.addHazard(hazardType, location, coordinates, moreInfo);
    closeDialog();
  };

  const shouldEnableSubmit = () => {
    return hazardType && location;
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClickOpen}
        style={{ width: '400px' }}>
        Report a Hazard
      </Button>
      <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Report New Hazard</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Help us be more up to date and please report any new hazard you encounter.
          </DialogContentText>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }} style={{ width: '100%' }}>
            <InputLabel
              variant="standard"
              htmlFor="uncontrolled-native"
              style={{ marginTop: '10px' }}>
              Hazard Type
            </InputLabel>
            <NativeSelect
              defaultValue={''}
              onChange={(event) => setHazardType(event.target.value)}
              inputProps={{
                name: 'hazardType',
                id: 'uncontrolled-native'
              }}>
              <option value="" style={{ width: '100%' }}></option>
              {MapUtils.hazardTypes.map((hazardType, index) => (
                <option key={index} value={hazardType}>
                  {MapUtils.markerText[hazardType]}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            style={{ marginTop: '10px' }}>
            Address
          </InputLabel>
          {/*//TODO: use geolocation autocomplete for address field & setCoordinates in onChange function*/}
          <TextField
            autoFocus
            margin="dense"
            id="address"
            type="address"
            fullWidth
            onChange={(event) => setLocation(event.target.value)}
          />
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            style={{ marginTop: '10px' }}>
            More Info
          </InputLabel>
          <TextField
            id="standard-multiline-static"
            multiline
            fullWidth
            minRows={4}
            defaultValue=""
            variant="standard"
            onChange={(event) => setMoreInfo(event.target.value)}
          />
        </DialogContent>
        <DialogActions style={{ margin: 'auto' }}>
          <Button
            onClick={handleSubmitHazard}
            color="primary"
            variant="contained"
            disabled={!shouldEnableSubmit()}>
            Submit
          </Button>
          <Button onClick={closeDialog} color="secondary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
