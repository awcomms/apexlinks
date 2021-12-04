import { browser } from '$app/env'

export default () => {
    let location = {}
    if (browser && window.navigator) {
        window.navigator.geolocation.getCurrentPosition((pos) => {
          location.lat = pos.coords.latitude;
          location.lon = pos.coords.longitude;
          console.log(location);
        });
    }
    console.log(location)
    return location
}