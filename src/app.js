const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");
const app = express();

// define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// handlebars set up. Engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(publicDir));

// app.com
// app.com/help
// app.com/about
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Tony",
    pageHeader: "Weather",
    createdBy: "Tony",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    pageHeader: "About Me",
    createdBy: "Tony",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "This is your help message.",
    pageHeader: "Help",
    createdBy: "Tony",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "Must provide an address",
    });
  }
  geoCode(address, (error, response) => {
    if (error) {
      return res.send({
        error,
      });
    }
    const { longtitude, latitude, location } = response;

    forecast(latitude, longtitude, (forecastError, forecastResponse) => {
      if (forecastError) {
        return res.send({
          error: forecastError,
        });
      }
      res.send({
        location,
        forecast: forecastResponse,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help",
    errorMessage: "Help article not found.",
  });
});

app.get("/products", (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.send({
      error: "You should place search item.",
    });
  }
  res.send({
    products: [],
  });
});

app.get("*", (req, res) =>
  res.render("error", {
    title: "WeatherApp",
    errorMessage: "Page not found.",
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening to PORT:${PORT}`));
