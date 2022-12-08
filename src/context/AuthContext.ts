import { User } from "firebase/auth";
import { createContext } from "react";
import AccountInfo from "../models/AccountInfo";
export interface AuthContextModel {
  account: AccountInfo | null;
  user: User | null; // null when not logged in
  setAccount: (account: AccountInfo) => void;
}
const defaultValue: AuthContextModel = {
  user: null,
  account: null,
  setAccount: () => {},
};
const AuthContext = createContext(defaultValue);
export default AuthContext;
