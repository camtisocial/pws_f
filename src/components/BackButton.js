import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'; // Import the CSS file

function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <button className="homeButton" onClick={handleClick}>
      <img src="/images/homeButton.png" alt="Back" className="homeButtonImage" />
    </button>
  );
}

export default BackButton;