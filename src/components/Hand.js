import React, { useEffect } from 'react';
import useCardEffects from './Card';
import './Hand.css';

function Hand() {
  useCardEffects(); // Calling the custom hook to apply hover effects

  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const handContainer = document.querySelector('.hand-container');
    const hoverArea = document.querySelector('.hover-area');

    if (!handContainer) {
      console.error('handContainer not found'); // Debugging
      return;
    }

    function handleMouseOver() {
      handContainer.classList.add('raised');
    }

    function handleMouseOut() {
      handContainer.classList.remove('raised');
    }

    hoverArea.addEventListener('mouseover', handleMouseOver);
    hoverArea.addEventListener('mouseout', handleMouseOut);

    cards.forEach((card) => {
      card.addEventListener('mouseover', handleMouseOver);
      card.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      hoverArea.removeEventListener('mouseover', handleMouseOver);
      hoverArea.removeEventListener('mouseout', handleMouseOut);

      cards.forEach((card) => {
        card.removeEventListener('mouseover', handleMouseOver);
        card.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  return (
    <div>
      <div className="hover-area"></div>
      <div className="hand-container">
        <img src="/images/pixelhand.png" alt="Hand" className="hand" />
        <div className="cards">
          <img src="/images/martiniCard.png" alt="Card 4" className="card" />
          <img src="/images/quillCard.png" alt="Card 3" className="card" />
          <img src="/images/floppyCard.png" alt="Card 2" className="card" />
          <img src="/images/jokerCard.png" alt="Card 1" className="card" />
        </div>
        <img src="/images/pixelthumb.png" alt="Thumb" className="thumb" />
      </div>
    </div>
  );
}

export default Hand;
