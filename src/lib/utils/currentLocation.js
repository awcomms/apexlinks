import { browser } from '$app/env'

export const currentLocation = new Promise((resolve) => {
  let location = {};
  if (browser) {
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        location.lat = pos.coords.latitude;
        location.lon = pos.coords.longitude;
      },
      (err) => {
        resolve(err);
      },
      {
        enableHighAccuracy: true,
      }
    );
  } else {
    resolve("current context not browser");
  }
  resolve(location);
});