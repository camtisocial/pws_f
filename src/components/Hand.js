import React, { useEffect, useRef, useState } from 'react';
import useCardEffects from './Card';
import './Hand.css';

function Hand() {
  const overlayBottomRef = useRef(null);
  const overlayTopRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useCardEffects(selectedCard); // Pass the selectedCard state to the custom hook

  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const handContainer = document.querySelector('.hand-container');
    const hoverArea = document.querySelector('.hover-area');
    const overlayBottom = overlayBottomRef.current;
    const overlayTop = overlayTopRef.current;

    function handleMouseOver() {
      if (!selectedCard) {
        handContainer.classList.add('raised');
      }
    }

    function handleMouseOut() {
      if (!selectedCard) {
        handContainer.classList.remove('raised');
      }
    }

    function selectCard(e) {
      setSelectedCard(e.target);
    }

    function resetFocus() {
      console.log('Resetting focus');

      // Reset the hand and other cards
      handContainer.classList.add('raised');

      // Hide the overlays
      overlayBottom.style.opacity = '0';
      overlayBottom.style.pointerEvents = 'none';
      overlayTop.style.opacity = '0';
      overlayTop.style.pointerEvents = 'none';

      // Reset the cards
      cards.forEach((card) => {
        card.style.transform = '';
        card.style.zIndex = '';
        card.style.pointerEvents = 'auto';
      });

      // Clear the selected card
      setSelectedCard(null);
    }

    hoverArea.addEventListener('mouseover', handleMouseOver);
    hoverArea.addEventListener('mouseout', handleMouseOut);

    cards.forEach((card) => {
      card.addEventListener('mouseover', handleMouseOver);
      card.addEventListener('mouseout', handleMouseOut);
      card.addEventListener('click', selectCard);
    });

    overlayBottom.addEventListener('click', resetFocus);
    overlayTop.addEventListener('click', resetFocus);

    if (selectedCard) {
      console.log('Selected card:', selectedCard);

      // Lower hand
      handContainer.classList.remove('raised');

      // Darken screen
      overlayBottom.style.opacity = '1.0';
      overlayBottom.style.pointerEvents = 'auto';
      overlayTop.style.opacity = '1.0';
      overlayTop.style.pointerEvents = 'auto';

      // Center card
      let translateX = 13;
      let translateY = -25;
      console.log(`translateX: ${translateX}, translateY: ${translateY}`);
      selectedCard.style.transform = 'none';
      selectedCard.style.transform = `translate(${translateX}vw, ${translateY}vw) scale(1.1)`;
      selectedCard.style.transition = 'transform 0.8s ease';
      selectedCard.style.zIndex = 6; // Ensure the clicked card is on top

      // Prevent the overlay from blocking the centered card
      selectedCard.style.pointerEvents = 'none';
    }

    return () => {
      hoverArea.removeEventListener('mouseover', handleMouseOver);
      hoverArea.removeEventListener('mouseout', handleMouseOut);

      cards.forEach((card) => {
        card.removeEventListener('mouseover', handleMouseOver);
        card.removeEventListener('mouseout', handleMouseOut);
        card.removeEventListener('click', selectCard);
      });

      overlayBottom.removeEventListener('click', resetFocus);
      overlayTop.removeEventListener('click', resetFocus);
    };
  }, [selectedCard]);

  return (
    <div>
      <div className="hover-area"></div>
      <div className="hand-container">
        <img src="/images/pixelhand.png" alt="Hand" className="hand" />
        <div className="cards">
          <img src="/images/martiniCard.png" alt="Card 4" className="card" key="card-4" />
          <img src="/images/jokerCard.png" alt="Card 1" className="card" key="card-1" />
          <img src="/images/floppyCard.png" alt="Card 2" className="card" key="card-2" />
          <img src="/images/quillCard.png" alt="Card 3" className="card" key="card-3" />
          <div className="overlay-bottom" ref={overlayBottomRef}></div>
          <img src="/images/pixelthumb.png" alt="Thumb" className="thumb" />
          <div className="overlay-top" ref={overlayTopRef}></div>
        </div>
      </div>
    </div>
  );
}

export default Hand;
