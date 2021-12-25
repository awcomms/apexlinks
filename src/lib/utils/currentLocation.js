import { browser } from '$app/env'

export default new Promise((resolve, reject) => {
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
        reject(err);
      },
      {
        enableHighAccuracy: true,
      }
    );
  } else {
    reject("current context not browser");
  }
  resolve(location);
});