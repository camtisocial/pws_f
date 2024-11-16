import React, { useState } from 'react';
import './Hand.css';

function Hand() {
    
    const [isHovered, setIsHovered] = useState(false);
    const handOnHover = () => setIsHovered(true);
    const handOnLeave = () => setIsHovered(false);
    console.log('isHovered', isHovered)
    
  return (
    <div>
      <div className="hover-area"></div>
      <div className="hand-container">
        <img src="/images/pixelhand.png" alt="Hand" className="hand" />
        <img src="/images/pixelthumb.png" alt="Thumb" className="thumb" />
      </div>
      </div>
  );
}

export default Hand;
