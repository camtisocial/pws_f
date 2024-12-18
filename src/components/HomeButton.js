import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeButton.css';

function HomeButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button className="homeButton" onClick={handleClick}>
      <img src="/images/homeButton.png" alt="Back" className="homeButtonImage" />
    </button>
  );
}

export default HomeButton;