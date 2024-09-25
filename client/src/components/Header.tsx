import "../CSS/Header.css";
import { UseDataLayerValue } from "../DataLayer";
import { Search, House } from "react-bootstrap-icons";

function Header() {
  const [{ user }] = UseDataLayerValue();
  // console.log(user);

  return (
    <div className="header">
      <House className="header-icon" />

      <div className="header-middle">
        <div className="header-search-bar">
          <Search className="header-icon" />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="header-search"
          />
        </div>
      </div>
      <div className="header-avatar">
        {/* <h4 className='header-avatar-username'>{user?.display_name}</h4> */}
        {user ? (
          user.images && user.images[0] ? (
            <img
              src={user.images[0].url}
              alt={user.display_name}
              className="header-avatar-img"
            />
          ) : (
            <img src="https://placehold.co/300x300" />
          )
        ) : (
          <p>user loading</p>
        )}
      </div>
    </div>
  );
}

export default Header;
