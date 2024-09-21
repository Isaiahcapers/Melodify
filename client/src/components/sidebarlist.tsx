import React from "react";
import "../CSS/sidebarlist.css";

function SidebarList({title,Icon}) {
return (
    <div className="sidebarlist">
        {Icon && <Icon className="sidebarlist-icon" />}
       {Icon ? <h4>{title}</h4> : <p> {title}</p>}
    </div>
)

}
export default SidebarList;