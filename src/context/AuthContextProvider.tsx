import { ReactNode, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import {
  addNewAccount,
  getAccountInfo,
} from "../services/AccountInfoApiService";
import AccountInfo from "../models/AccountInfo";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [rendered, setRendered] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<AccountInfo | null>(null);
  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      console.log(newUser);
      if (newUser) {
        setUser(newUser);
        getAccountInfo(newUser?.uid!).then((res) => {
          if (res) {
            setAccount(res);
            console.log(res);
          } else {
            addNewAccount({
              userName: newUser.displayName || "",
              email: newUser.email || "",
              loggedIn: true,
              uid: newUser.uid,
              favorites: [],
            }).then((response) => {
              setAccount(response);
            });
          }
        });
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
