import React from 'react';
import './AdminTab.scss';

const AdminTab = ({ text, icon, isActive, onClick }) => {
  const handleClickTab = () => {
    onClick(text);
  };

  return (
    <div className={`${isActive ? 'active-tab admin-tab' : 'admin-tab'}`} onClick={handleClickTab}>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </div>
  );
};

export default AdminTab;
