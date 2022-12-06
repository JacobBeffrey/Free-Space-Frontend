import axios from "axios";
import PeopleInSpace from "../models/PeopleInSpace";

export const getPeopleInSpace = (): Promise<PeopleInSpace> => {
  return axios
    .get(`http://api.open-notify.org/astros.json`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};
