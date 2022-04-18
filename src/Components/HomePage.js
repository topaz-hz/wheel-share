import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import NavigationForm from './MapAndNavigation/NavigationForm';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1)
//     }
//   }
// }));

export default function HomePage() {
  // const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container
        style={{
          height: '100vh',
          width: '100vw',
          textAlign: 'center'
        }}>
        <h1 style={{ color: 'darkblue' }}>WheelShare</h1>
        <Divider variant="middle" />
        <NavigationForm />
      </Container>
    </>
  );
}
