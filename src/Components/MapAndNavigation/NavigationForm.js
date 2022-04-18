import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

export default function NavigationForm() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Plan a Trip
      <div>
        <label htmlFor="contained-button-file">
          <TextField id="outlined-basic" label="Start" variant="outlined" size="small" />
          <TextField id="outlined-basic" label="End" variant="outlined" size="small" />
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={() => window.console.log('go button was clicked')}>
            Go!
          </Button>
        </label>
      </div>
    </div>
  );
  // }
}
