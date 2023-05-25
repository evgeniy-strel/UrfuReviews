import React from 'react';
import './status_modal_window.scss';
import ModalWindow from '../ModalWindow';

const StatusModalWindow = ({ statusLogin, onClose }) => {
  return (
    <ModalWindow onClose={onClose}>
      <div className="sign_up_modal_window status_sign_up">
        <div alt="close" onClick={onClose} className="close_window"></div>
        <div className={`img_status ${statusLogin && statusLogin?.img}`}></div>
        <div className="text_status">{statusLogin && statusLogin?.text}</div>
      </div>
    </ModalWindow>
  );
};

export default StatusModalWindow;
