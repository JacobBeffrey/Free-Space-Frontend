import axios from "axios";
import AccountInfo from "../models/AccountInfo";

const baseUrl: string = process.env.REACT_APP_API_URL || "";
export const getAllAccountInfo = (): Promise<AccountInfo[]> => {
  return axios.get(`${baseUrl}/AccountInfo/all-login`).then((res) => res.data);
};
