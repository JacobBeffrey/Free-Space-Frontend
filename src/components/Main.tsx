import { url } from "inspector";
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
      {/* style ={{backgroundImage:url(`${apod?.hdurl}`)}} */}
      <h2>{`${apod?.title}`}</h2>
      <p className="Date">{`${apod?.date}`}</p>
      <img src={`${apod?.hdurl}`} alt={`${apod?.title}`} />
      <p className="Summary">{`${apod?.explanation}`}</p>
    </div>
  );
};

export default Main;
