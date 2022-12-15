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
  const [favBoolean, setFavBoolean] = useState(false);

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
      <Link to="/home">
        <h1>Free Space</h1>
      </Link>
      <div className="nav-container">
        <nav className="menu-nav">
          <ul className="nav-ul">
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
        <nav className="favorites-nav">
          <button onClick={() => setFavBoolean(!favBoolean)}>Favorites</button>
          {favBoolean && (
            <ul className="favorite-events">
              {favorites?.map((item) => (
                <li key={item._id}>
                  <span
                    onClick={() => removeEvent(item)}
                    className="delete-btn"
                  >
                    x
                  </span>{" "}
                  <a
                    onClick={() => console.log(item.URL)}
                    href={item.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
      {user ? (
        <div className="signout-button-div">
          <p>{user.displayName}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div className="signin-btn-div">
          <button onClick={signInWithGoogle}>Sign In</button>
        </div>
      )}
    </header>
  );
};

export default Header;
