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
  return <div className="WeatherForecast"></div>;
};

export default WeatherForecast;
