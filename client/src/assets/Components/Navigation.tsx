import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home Page
          </Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === "/playlist" ? "active" : ""}>
            Playlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};
