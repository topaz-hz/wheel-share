const getSvgMarker = (google, markerType) => {
  return {
    url: markerURLs[markerType],
    scaledSize: new google.maps.Size(28, 28),
    anchor: new google.maps.Point(15, 30)
  };
};

const markerTypes = [
  'carBlocking',
  'bikeBlocking',
  'step',
  'narrowSidewalk',
  'other',
  'currentLocation'
];

const hazardTypes = ['carBlocking', 'bikeBlocking', 'step', 'narrowSidewalk', 'other'];

const markerText = {
  carBlocking: 'Car Blocking',
  bikeBlocking: 'Bike Blocking',
  step: 'Step',
  narrowSidewalk: 'Narrow Sidewalk',
  other: 'Other',
  currentLocation: 'Current Location'
};

const markerURLs = {
  carBlocking: 'https://www.svgrepo.com/show/122406/small-car.svg',
  bikeBlocking: 'https://www.svgrepo.com/show/98190/bike.svg',
  step: 'https://www.svgrepo.com/show/355278/steps.svg',
  narrowSidewalk: 'https://www.svgrepo.com/show/86840/narrow-two-lanes-sign.svg',
  other: 'https://www.svgrepo.com/show/340584/location-hazard-filled.svg',
  currentLocation:
    'https://www.svgrepo.com/show/382702/location-pin-navigation-destination-maps.svg'
};

const hazardListColumns = ['Hazard Type', 'Location', 'Updated'];

export { hazardListColumns, hazardTypes, getSvgMarker, markerTypes, markerText, markerURLs };
