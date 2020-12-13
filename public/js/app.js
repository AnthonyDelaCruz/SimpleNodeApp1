console.log("JS FILE.");

// fetch("http://puzzle.mead.io/puzzle")
//   .then((res) => res.json())
//   .then((res) => console.log("res", res))
//   .catch((error) => console.log("error", error.message));

const form = document.querySelector("form");
const searchForm = document.querySelector("input");
const errorEl = document.querySelector(".error");
const locationEl = document.querySelector(".location");
const forecastEl = document.querySelector(".forecast");

function getWeatherForLocation(e) {
  e.preventDefault();
  const searchQuery = searchForm.value;
  const requestUrl = `http://localhost:3000/weather?address=${searchQuery}`;
  errorEl.innerHTML = "";
  locationEl.innerHTML = "";
  forecastEl.innerHTML = "";
  fetch(requestUrl)
    .then((res) => res.json())
    .then((res) => {
      const { error, location, address, forecast } = res;
      if (error) {
        errorEl.innerHTML = error;
      } else {
        locationEl.innerHTML = location;
        forecastEl.innerHTML = forecast;
      }
    });
}
form.addEventListener("submit", (e) => getWeatherForLocation(e));
