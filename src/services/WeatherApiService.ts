import axios from "axios";
import Gridpoints from "../models/Weather";

import Forecast from "../models/Forecast";

export const getGridPoints = (
  latitude: number,
  longitude: number
): Promise<Gridpoints> => {
  return axios
    .get(`https://api.weather.gov/points/${latitude},${longitude}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getForecast = (forecastURL: string): Promise<Forecast> => {
  return axios
    .get(forecastURL)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};
