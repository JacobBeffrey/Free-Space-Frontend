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

  return <div className="ISS"></div>;
};

export default ISS;
