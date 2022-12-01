import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header className="Header">
      <div>
        <Link to="/home">
          <h1>Free Space</h1>
        </Link>
      </div>
      <div className="nav-container">
        <nav>
          <button>Sign In</button>
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
