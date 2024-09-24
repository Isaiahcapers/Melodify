import React from 'react';

interface SidebarListProps {
  id?:string;
  title: string;
  Icon?: React.ComponentType;
  image?: string;
  onSelectPlaylist?: (id?:string) => void;
}

const SidebarList: React.FC<SidebarListProps> = ({ title, Icon, image, onSelectPlaylist,id }) => {
  return (
    <div className="sidebarList" onClick={() => onSelectPlaylist && onSelectPlaylist(id)}>
      {Icon && <Icon 
      // className="sidebarList-icon"  
      />}
      {image && <img src={image} alt={title} className="sidebarList__image" />}
      <h4>{title}</h4>
    </div>
  );
};

export default SidebarList;