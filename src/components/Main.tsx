import { useEffect, useState } from "react";
import PictureOfTheDay from "../models/PictureOfTheDay";
import { getPictureOfTheDay } from "../services/PictureOfTheDayApiService";
import "./Main.css";

const Main = () => {
  const [apod, setApod] = useState<PictureOfTheDay>();
  useEffect(() => {
    getPictureOfTheDay().then((res) => setApod(res));
  }, []);

  return (
    <div className="Main">
      <h2>{`${apod?.title}`}</h2>
      <p>{`${apod?.date}`}</p>
      <img src={`${apod?.hdurl}`} alt={`${apod?.title}`} />
      <p>{`${apod?.explanation}`}</p>
    </div>
  );
};

export default Main;
