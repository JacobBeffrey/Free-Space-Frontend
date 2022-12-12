import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import CalendarEvent from "../models/CalendarEvent";
import { updateAccount } from "../services/AccountInfoApiService";
import "./Header.css";
import WeatherForecast from "./WeatherForecast";
const Header = () => {
  const { user } = useContext(AuthContext);
  const { account, setAccount } = useContext(AuthContext);
  const [calendarJsonInput, setCalendarJsonInput] = useState<CalendarEvent[]>();
  const [favorites, setFavorites] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setCalendarJsonInput(() => {
      if (account) {
        const updatedArray = [...account?.favorites];
        console.log(updatedArray);
        updatedArray.forEach((item) => {
          // let xStart = item.start.toString();
          // let xEnd = item.end.toString();
          item.start = new Date(item.start);
          item.end = new Date(item.end);
        });
        console.log(updatedArray);
        setFavorites(updatedArray);
        return updatedArray;
      }
    });
  }, [account]);
  console.log("favorites:", favorites);

  const removeEvent = (e: CalendarEvent) => {
    console.dir(e);

    if (e && account) {
      const copyOfAccount = { ...account };
      const index: number = favorites?.findIndex((item) => {
        return item.title === e.title;
      });
      console.log(index);
      copyOfAccount.favorites.splice(index, 1);
      console.log(copyOfAccount, e);

      updateAccount(copyOfAccount).then((res) => {
        setAccount(res);
      });
    }
  };
  return (
    <header className="Header">
      <div>
        <Link to="/home">
          <h1>Free Space</h1>
        </Link>
        <ul>
          {favorites?.map((item) => (
            <li onClick={() => removeEvent(item)} key={item._id}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      <ul className="favorite-events"></ul>
      <div></div>
      <div className="nav-container">
        <nav>
          {user ? (
            <div>
              <p>{user.displayName}</p>
              <button onClick={signOut}>Sign Out</button>
            </div>
          ) : (
            <button onClick={signInWithGoogle}>Sign In</button>
          )}
          <ul>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/iss">NASA TV</Link>
            </li>
            <li>
              <Link to="/bookmarked">Bookmarked</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
