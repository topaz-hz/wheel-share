import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //TODO: call function to add hazard to database & save data from input fields
    setOpen(false);
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Report new hazard</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Help us be more up to date and please report any new vulnerability you encounter.
          </DialogContentText>
          {/*<TextField*/}
          {/*  autoFocus*/}
          {/*  margin="dense"*/}
          {/*  id="type"*/}
          {/*  label="Hazard Type"*/}
          {/*  type="hazard"*/}
          {/*  fullWidth*/}
          {/*/>*/}
          <select style={{ width: '50%' }}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option selected value="coconut">
              Coconut
            </option>
            <option value="mango">Mango</option>
          </select>
          {/*//TODO: use geolocation autocomplete to address field*/}
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="address"
            fullWidth
          />
          <TextField autoFocus margin="dense" id="date" type="date" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
