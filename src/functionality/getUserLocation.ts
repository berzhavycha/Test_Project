export function getLocation(): any {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}


export const customLocation = () => {
  let latitude: number = 0;
  let longitude: number = 0;

  const setCoords = (lat: number, lon: number) => {
    latitude = lat;
    longitude = lon;
  };

  const getCoords = () => ({ latitude, longitude });

  return {
    setCoords,
    getCoords,
  };
}


function showPosition(position: GeolocationPosition) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  return { latitude, longitude }
}

function showError(error: GeolocationPositionError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
  }
}

