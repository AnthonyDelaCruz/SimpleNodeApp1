const request = require("request");
const MAPBOX_PUBLIC_TOKEN =
  "pk.eyJ1IjoidG9ueWRjIiwiYSI6ImNraWN2eGN5bzBpeG4ycHJzbWJrZHZvZnIifQ.K0w6JvRPJsheL6mOSU63uw";

const geoCode = (address, callBack) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${MAPBOX_PUBLIC_TOKEN}&limit=1`;
  request({ url, json: true }, (error, response) => {
    const { features } = response.body;
    if (error) {
      callBack(error, undefined);
    } else if (!features.length) {
      callBack("No locations found, try again.", undefined);
    } else {
      const coordinates = features[0].center;
      const location = features[0].place_name;
      const [longtitude, latitude] = coordinates;
      callBack(undefined, { longtitude, latitude, location });
    }
  });
};

module.exports = geoCode;
