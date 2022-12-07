import axios from "axios";
import AccountInfo from "../models/AccountInfo";

const baseUrl: string = process.env.REACT_APP_API_URL || "";
export const getAccountInfo = (uid: string): Promise<AccountInfo> => {
  return axios.get(`${baseUrl}/AccountInfo/${uid}`).then((res) => res.data);
};

export const addNewAccount = (
  newAccount: AccountInfo
): Promise<AccountInfo> => {
  return axios
    .post(`${baseUrl}/AccountInfo`, newAccount)
    .then((res) => res.data);
};
