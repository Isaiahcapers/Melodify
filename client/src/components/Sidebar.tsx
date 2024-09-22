import React,{useState,useEffect} from 'react';
import "../CSS/Sidebar.css";
import image1 from "../assets/images/melodify-logo2.png";
import SidebarList from "./sidebarlist";
import { House, Search } from 'react-bootstrap-icons';
import { UseDataLayerValue } from "../DataLayer";

const Sidebar: React.FC = () => {
  const [{ playlists, token }, dispatch] = UseDataLayerValue();
  console.log("sidebar has acess to playlist",playlists);
  console.log("sidebar has access to the token",token);
  
  const [localPlaylists, setLocalPlaylists] = useState<any[]>([]);

// console.log("sidebar has access to the token",token);
  useEffect(() => {
  if (token) {
    fetchAndSetPlaylists(token);
    
  }
  }, [token]);


  async function fetchAndSetPlaylists(token: string) {
    const data = await getFeaturedPlaylist(token);
    dispatch({ type: 'SET_PLAYLISTS', playlists: data.playlists.items });
    setLocalPlaylists(data.playlists.items);
  }
  
  async function getFeaturedPlaylist(token: string) {
    const result = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("GFP function",result);
    
    const data = await result.json();
    return data;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img className="sidebar-img" src={image1} alt="logo" />
        <h2>Melodify</h2>
      </div>

      <SidebarList Icon={House} title="Home" />
      <SidebarList Icon={Search} title="Playlist" />
      <strong className="sidebar-title">PLAYLIST</strong>
      <hr />
      {localPlaylists.map((playlist: { name: string; images: { url: string }[] }) => (
        <SidebarList key={playlist.name} title={playlist.name} image={playlist.images[0]?.url} />
      ))}
    </div>
  );
};

export default Sidebar;
