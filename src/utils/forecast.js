const request = require("request");
const API_KEY = "9778ff638c19a0a64dc5001820af9c9e";
const BASE_URL = "http://api.weatherstack.com/";

const forecast = (lat, lon, callBack) => {
  const url = `${BASE_URL}current?access_key=${API_KEY}&query=${lat},${lon}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callBack(error, undefined);
    } else {
      const {
        temperature,
        feelslike: feelsLike,
        weather_descriptions: weatherDescriptions,
      } = response.body.current;
      const responseString = `${weatherDescriptions[0]}, The current temperature is ${temperature}, but it feels like ${feelsLike}`;
      callBack(undefined, responseString);
    }
  });
};

module.exports = forecast;
