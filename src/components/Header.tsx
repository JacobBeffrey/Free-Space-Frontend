import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="Header">
      <div>
        <Link to="/home">
          <h1>Free Space</h1>
        </Link>
      </div>
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
              <Link to="/calendar">Look Up</Link>
            </li>
            <li>
              <Link to="/iss">ISS</Link>
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
