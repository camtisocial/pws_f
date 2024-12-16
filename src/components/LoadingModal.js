import React from 'react';
import './LoadingModal.css';

function LoadingModal() {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Loading...</h1>
      </div>
    </div>
  );
}

export default LoadingModal;