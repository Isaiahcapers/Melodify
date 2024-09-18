import { Link, useLocation } from "react-router-dom";

interface NavigationLinks {
  to: string;
  pageTitle: string;
}

const ListItems = (props: NavigationLinks & { isActive: boolean }) => {
  return (
    <li className={`nav-button {props.isActive ? 'active' : ''}`}>
      <Link to={props.to}>{props.pageTitle}</Link>
    </li>
  );
};

export default function Navigation() {
  const currentTab = useLocation().pathname;



  const navLinks = [

    { pageTitle: 'Home Page', path: '/' },
    { pageTitle: 'Playlist', path: '/playlist' },

  ];

  return (
    <>
      <ul className="nav-css">
        {
          navLinks.map((navLinks) => (
            <ListItems
              key={navLinks.pageTitle}
              to={navLinks.path}
              pageTitle={navLinks.pageTitle}
              isActive={currentTab === navLinks.path} />
          ))
        }
      </ul>

    </>
  );
}
