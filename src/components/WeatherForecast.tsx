import { useEffect, useState } from "react";
import Forecast from "../models/Forecast";
import { getForecast, getGridPoints } from "../services/WeatherApiService";
import "./WeatherForecast.css";

const WeatherForecast = () => {
  const [weather, setWeather] = useState<Forecast>();
  useEffect(() => {
    // if (lat && longitude) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      console.log(lat);
      console.log(long);
      getGridPoints(lat, long).then((res) => {
        getForecast(res.properties.forecast).then((response) => {
          console.log(response);
          setWeather(response);
        });
      });
    });
  }, []);
  return (
    <div className="WeatherForecast">
      <ul>
        {weather?.properties.periods[0].name === "Tonight" ? (
          <>
            <li>{weather?.properties.periods[0].name}</li>
            <li>
              {weather?.properties.periods[0].temperature}
              {weather?.properties.periods[0].temperatureUnit}
            </li>
            <li>{weather?.properties.periods[0].shortForecast}</li>
            <li>
              <img
                src={weather?.properties.periods[0].icon}
                alt="weather icon"
              />
            </li>
          </>
        ) : (
          <>
            <li>{weather?.properties.periods[1].name}</li>
            <li>
              {weather?.properties.periods[1].temperature}
              {weather?.properties.periods[1].temperatureUnit}
            </li>
            <li>{weather?.properties.periods[1].shortForecast}</li>
            <li>
              <img
                src={weather?.properties.periods[1].icon}
                alt="weather icon"
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default WeatherForecast;
