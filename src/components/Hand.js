import React, { useEffect, useRef } from 'react';
import useCardEffects from './Card';
import './Hand.css';

function Hand() {
  useCardEffects(); // Calling the custom hook to apply hover effects
  const overlayBottomRef = useRef(null);
  const overlayTopRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const handContainer = document.querySelector('.hand-container');
    const hoverArea = document.querySelector('.hover-area');
    const overlayBottom = overlayBottomRef.current;
    const overlayTop = overlayTopRef.current;

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
      overlayBottom.style.opacity= '1.0';
      overlayTop.style.opacity= '1.0';

      //center card
      let translateX = 13;
      let translateY = -25;
      clickedCard.style.transform = 'none';
      clickedCard.style.transform = `translate( ${translateX}vw, ${translateY}vw) scale(1.1)`;
      clickedCard.style.transition = 'transform 0.8s ease';
      clickedCard.style.zIndex = 6; 
    }

    function resetFocus() {
      // Reset the hand and other cards
      handContainer.classList.add('raised');

      // Hide the overlay
      overlayBottom.style.opacity = '0';
      overlayTop.style.opacity = '0';
      overlayBottom.style.pointerEvents = 'none';
      overlayTop.style.pointerEvents = 'none';

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

      overlayBottom.removeEventListener('click', resetFocus);
      overlayTop.removeEventListener('click', resetFocus);
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
          <div className="overlay-bottom" ref={overlayBottomRef}></div>
          <img src="/images/pixelthumb.png" alt="Thumb" className="thumb" />
          <div className="overlay-top" ref={overlayTopRef}></div>
        </div>
      </div>
    </div>
  );
}

export default Hand;
