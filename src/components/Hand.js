import React, { useEffect } from 'react';
import useCardEffects from './Card';
import './Hand.css';

function Hand() {
  useCardEffects(); // Calling the custom hook to apply hover effects

  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const handContainer = document.querySelector('.hand-container');
    const hoverArea = document.querySelector('.hover-area');
    const overlay = document.querySelector('.overlay');

    function handleMouseOver() {
      handContainer.classList.add('raised');
    }

    function handleMouseOut() {
      handContainer.classList.remove('raised');
    }

    function centerCard(e) {
      const clickedCard = e.target;

      //lower hand
      handContainer.classList.remove('raised');

      //darken screen
      overlay.style.opacity= '1.0';

      //center card
      let translateX = 13;
      let translateY = -25;
      clickedCard.style.transform = 'none';
      clickedCard.style.transform = `translate( ${translateX}vw, ${translateY}vw) scale(1.1)`;
      clickedCard.style.transition = 'transform 0.8s ease';
      clickedCard.style.zIndex = 100; 
    }

    function resetFocus() {
      // Reset the hand and other cards
      handContainer.classList.add('raised');

      // Hide the overlay
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';

      // Reset the cards
      cards.forEach((card) => {
        card.style.transform = '';
        card.style.zIndex = '';
        card.style.transition = 'transform 0.25s ease';
      });
    }

    hoverArea.addEventListener('mouseover', handleMouseOver);
    hoverArea.addEventListener('mouseout', handleMouseOut);

    cards.forEach((card) => {
      card.addEventListener('mouseover', handleMouseOver);
      card.addEventListener('mouseout', handleMouseOut);
      card.addEventListener('click', centerCard);
    });

    return () => {
      hoverArea.removeEventListener('mouseover', handleMouseOver);
      hoverArea.removeEventListener('mouseout', handleMouseOut);

      cards.forEach((card) => {
        card.removeEventListener('mouseover', handleMouseOver);
        card.removeEventListener('mouseout', handleMouseOut);
        card.removeEventListener('click', centerCard);
      });

      overlay.removeEventListener('click', resetFocus);
    };
  }, []);

  return (
    <div>
      <div className="hover-area"></div>
      <div className="hand-container">
        <img src="/images/pixelhand.png" alt="Hand" className="hand" />
        <div className="cards">
          <img src="/images/martiniCard.png" alt="Card 4" className="card" />
          <img src="/images/jokerCard.png" alt="Card 1" className="card" />
          <img src="/images/floppyCard.png" alt="Card 2" className="card" />
          <img src="/images/quillCard.png" alt="Card 3" className="card" />
        </div>
        <img src="/images/pixelthumb.png" alt="Thumb" className="thumb" />
      </div>
      <div className="overlay"></div>
    </div>
  );
}

export default Hand;
