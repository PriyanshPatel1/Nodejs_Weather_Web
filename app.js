// import readline from "readline/promises";

// const API_KEY = "20e803580561686fe774b482126d1120";
// const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const getWeather = async (city) => {
//   const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("City Not Found");
//     }
//     const weatherData = await response.json();
//     console.log("Data", weatherData);
//     console.log("\n Weather Information:");
//     console.log(`\n City:${weatherData.name}`);
//     console.log(`Temperature:${weatherData.main.temp} Celsius`);
//     console.log(`Description:${weatherData.weather[0].description}`);
//     console.log(`Humidity:${weatherData.main.humidity}%`);
//     console.log(`Wind Speed:${weatherData.wind.speed}m/s\n`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const city = await rl.question("Enter a City to get its Weather:");
// await getWeather(city);
// rl.close();
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const API_KEY = process.env.WEATHER_API_KEY;

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const city = req.body.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = response.data;
    const weather = {
      city: data.name,
      temp: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      clouds: data.clouds.all,
    };
    res.render("index", { weather, error: null });
  } catch (err) {
    res.render("index", { weather: null, error: "City not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
