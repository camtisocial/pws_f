import React from 'react';
import useCardEffects from './Card';
import './Hand.css';

function Hand() {
    
   useCardEffects();
    
  return (
    <div>
      <div className="hover-area"></div>
      <div className="hand-container">
        <img src="/images/pixelhand.png" alt="Hand" className="hand" />
        <div className="cards">
          <img src="/images/martiniCard.png" alt="Card 4" className="card hover-border" />
          <img src="/images/quillCard.png" alt="Card 3" className="card hover-border" />
          <img src="/images/floppyCard.png" alt="Card 2" className="card hover-border" />
          <img src="/images/jokerCard.png" alt="Card 1" className="card hover-border" />
        </div>
        <img src="/images/pixelthumb.png" alt="Thumb" className="thumb" />
      </div>
      </div>
  );
}

export default Hand;
