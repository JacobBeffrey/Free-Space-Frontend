import axios from "axios";
import PictureOfTheDay from "../models/PictureOfTheDay";

// const apiKey: string = process.env.REACT_APP_API_KEY || "";
// console.log(apiKey);
export const getPictureOfTheDay = (): Promise<PictureOfTheDay> => {
  return axios
    .get(
      `https://api.nasa.gov/planetary/apod?api_key=o2t8CEVfBdCwxSMs3Iep4k2mV6lr5UDY1nkgeMTr`
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};
