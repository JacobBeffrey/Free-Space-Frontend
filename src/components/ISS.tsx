import { useEffect, useState } from "react";
import PeopleInSpace, { Astronauts } from "../models/PeopleInSpace";
import { getPeopleInSpace } from "../services/PeopleInSpaceApiService";

import "./ISS.css";

const ISS = () => {
  const [allAstronauts, setallAstronauts] = useState<PeopleInSpace>();
  useEffect(() => {
    getPeopleInSpace().then((res) => setallAstronauts(res));
  }, []);
  // console.log(allAstronauts?.people);
  const issAstronauts = allAstronauts?.people.filter((item) => {
    return item.craft === "ISS";
  });
  console.log(issAstronauts);

  return (
    <div className="ISS">
      <p>Current Astronauts on the ISS</p>
      <ul className="AstronautsList">
        {issAstronauts?.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <iframe
        src="https://www.youtube.com/embed/21X5lGlDOfg?rel=0"
        allowFullScreen
        title="NASA live TV"
        height={480}
        width={854}
      ></iframe>
    </div>
  );
};

export default ISS;
