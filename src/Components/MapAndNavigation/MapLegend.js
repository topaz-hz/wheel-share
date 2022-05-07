import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import * as MapUtils from './MapUtils';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function MapLegend() {
  return (
    <div style={{ position: 'absolute', bottom: 20, width: 'calc(100% - 32px)' }}>
      <div style={{ fontSize: 20, fontWeight: 600 }}>Map Legend</div>
      <Grid
        container
        spacing={1}
        style={{ marginTop: 10, verticalAlign: 'middle', justifyContent: 'space-evenly' }}>
        {MapUtils.markerTypes.map((type, index) => (
          <Item key={index} style={{ width: 170, height: 36 }}>
            <div style={{ padding: 8 }}>
              <img
                src={MapUtils.markerURLs[type]}
                width="20"
                height="20"
                style={{ verticalAlign: 'middle' }}
              />
              <span style={{ marginLeft: 10, verticalAlign: 'middle' }}>
                {MapUtils.markerText[type]}
              </span>
            </div>
          </Item>
        ))}
      </Grid>
    </div>
  );
}
