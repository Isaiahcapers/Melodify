import React from 'react';

interface SidebarListProps {
  title: string;
  Icon?: React.ComponentType;
  image?: string;
  onClick?: () => void;
}

const SidebarList: React.FC<SidebarListProps> = ({ title, Icon, image, onClick }) => {
  return (
    <div className="sidebarList">
      {Icon && <Icon className="sidebarList-icon" onClick={onClick} />}
      {image && <img src={image} alt={title} className="sidebarList__image" />}
      <h4>{title}</h4>
    </div>
  );
};

export default SidebarList;
