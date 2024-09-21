import React from "react";
import "../CSS/Sidebar.css";
import image1  from "../assets/images/melodify-logo2.png"
import SidebarList from "./sidebarlist";
import {House} from 'react-bootstrap-icons';
import { Search } from "react-bootstrap-icons";
import { UseDataLayerValue } from "../DataLayer";
function Sidebar() {
  return (
    const [{playlists}, dispatch] =     UseDataLayerValue();
    <div className ="sidebar">
        <div className="sidebar-logo">
        <img className="sidebar-img" src={image1} alt="logo" />
        <h2>Melodify</h2>
        </div>
    
        <SidebarList Icon={House} title="Home" />
        <SidebarList Icon={Search} title="Playlist"/>
        <strong className="sidebar-title">PLAYLIST</strong>
        <hr />
        {playlists?.items?.map((playlist) => (
            <SidebarList title={playlist.name} />
        ))}
        <SidebarList title="Rock"/>
        <SidebarList title="Pop"/>
        <SidebarList title="Jazz"/>
    </div>
  );
}

export default Sidebar;