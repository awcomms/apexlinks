import { browser } from '$app/env'

export default new Promise((resolve) => {
  let location = {};
  if (browser) {
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        location.lat = pos.coords.latitude;
        location.lon = pos.coords.longitude;
        console.log(location);
      },
      (err) => {
        console.log();
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