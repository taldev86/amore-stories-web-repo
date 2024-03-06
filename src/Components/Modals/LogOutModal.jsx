import React from 'react';
import './ModalsCustom.css'
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`custom-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Are you sure you want to logout?</h2>
        <div className="button-container">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;