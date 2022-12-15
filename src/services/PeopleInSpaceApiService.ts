import axios from "axios";
import PeopleInSpace from "../models/PeopleInSpace";

const baseUrl: string = process.env.REACT_APP_API_URL || "";
export const getPeopleInSpace = (): Promise<PeopleInSpace> => {
  return axios
    .get(`${baseUrl}/calendar/iss`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};
