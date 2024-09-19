import { Link, useLocation, useNavigate } from "react-router-dom";
import '../components/Navigation.css';
import { useEffect, useState } from "react";

interface NavigationLinks {
  to: string;
  pageTitle: string;
}

const ListItems = (props: NavigationLinks & { isActive: boolean, handleClick: () => void }) => {
  return (
    <li className={`nav-button ${props.isActive ? 'active' : ''}`}>
      <Link to={props.to} onClick={props.handleClick}>
        {props.pageTitle}
      </Link>
    </li>
  );
};

export default function Navigation() {
  const currentTab = useLocation().pathname;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in by checking for token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token from local storage
    setIsLoggedIn(false); // Update state
    navigate("/login"); // Redirect to login after logout
  };

  const handleLinkClick = (path: string) => {
    if (currentTab === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { pageTitle: 'Home Page', path: '/' },
    { pageTitle: 'Playlist', path: '/playlist' },
  ];

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <img src="/src/assets/images/melodify-logo2.png" alt="Melodify Logo" />
      </div>

      <ul className="nav-css">
        {navLinks.map((navLink) => (
          <ListItems
            key={navLink.pageTitle}
            to={navLink.path}
            pageTitle={navLink.pageTitle}
            isActive={currentTab === navLink.path}
            handleClick={() => handleLinkClick(navLink.path)}
          />
        ))}
        {isLoggedIn ? (
          <li className="nav-button">
            <button onClick={handleLogout}>Sign Out</button>
          </li>
        ) : (
          <li className="nav-button">
            <Link to="/login">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
