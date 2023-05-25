import React from 'react';
import './modal_window.scss';

const ModalWindow = ({ children, onClose }) => {
  const handleClickLayout = (e) => {
    if (e.target.classList == 'layout') onClose();
  };

  return (
    <div className="layout" onClick={handleClickLayout}>
      <div className="modal_window">{children}</div>
    </div>
  );
};

export default ModalWindow;
