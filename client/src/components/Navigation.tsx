import { Link, useLocation, useNavigate } from "react-router-dom";
import '../CSS/Navigation.css';
import { useEffect, useState } from "react";
import logo from '../assets/images/melodify-logo2.png';
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
  const [username, setUsername] = useState<string | null>(null); // Store username from token

  // Check if user is logged in by checking for token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken: any = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
      setUsername(decodedToken.username); // Extract and set username from token
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token from local storage
    setIsLoggedIn(false); // Update state
    setUsername(null); // Clear username
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
    { pageTitle: 'Home Page', path: '/home' },
    { pageTitle: 'Playlist', path: '/playlist' },
  ];

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <img src={logo} alt="Melodify Logo" />
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
          <>
            <li className="nav-button">
              {/* Display the logged-in user's username */}
              <span>Welcome, {username}!</span>
            </li>
            <li className="nav-button">
              <button onClick={handleLogout}>Sign Out</button>
            </li>
          </>
        ) : (
          <li className="nav-button">
            <Link to="/login">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
