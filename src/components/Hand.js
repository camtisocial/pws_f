import React, { useEffect, useRef, useState } from 'react';
import useCardEffects from './Card';
import './Hand.css';

function Hand() {
  const overlayBottomRef = useRef(null);
  const overlayTopRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useCardEffects(selectedCard, setSelectedCard, overlayBottomRef.current, overlayTopRef.current);

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

    function resetFocus() {
      // const cardContainer= selectedCard.parentElement;
      // console.log('Resetting focus');

      handContainer.classList.add('raised');

      overlayBottom.style.opacity = '0';
      overlayBottom.style.pointerEvents = 'none';
      overlayTop.style.opacity = '0';
      overlayTop.style.pointerEvents = 'none';


      cards.forEach((card) => {
        const cardContainer= card.parentElement;
        cardContainer.style.transform = `
          translate(0, 0)`
        card.style.zIndex = '';
        cardContainer.style.zIndex = '';
        cardContainer.style.transition = '1s ease';
      });

      hoverArea.style.pointerEvents = 'auto';
      setSelectedCard(null);
    }

    hoverArea.addEventListener('mouseover', handleMouseOver);
    hoverArea.addEventListener('mouseout', handleMouseOut);

    cards.forEach((card) => {
      card.addEventListener('mouseover', handleMouseOver);
      card.addEventListener('mouseout', handleMouseOut);
      card.addEventListener('click', (e) => {
        if (selectedCard === card) {
          console.log('Clicked on the selected card:opacity', selectedCard);
        } else {
          setSelectedCard(card);
        }
      });
    });

    overlayBottom.addEventListener('click', resetFocus);
    overlayTop.addEventListener('click', resetFocus);

    if (selectedCard) {
      console.log('Selected card:', selectedCard);

      handContainer.classList.remove('raised');

      const cardContainer= selectedCard.parentElement;
      cardContainer.style.transition= 'transform 0.80s ease, z-index 1s ease';
      cardContainer.style.transform = `translate(13.5vw, -24vw)`;
      // cardContainer.style.zIndex = '60';
      selectedCard.style.transition = 'transform 0.80s ease, z-index 0.80s ease';
      selectedCard.style.transform = '';
      // selectedCard.style.zIndex = '60';


      overlayBottom.style.opacity = '1.0';
      overlayBottom.style.pointerEvents = 'auto';
      overlayTop.style.opacity = '1.0';
      overlayTop.style.pointerEvents = 'auto';

      selectedCard.removeEventListener('mouseover', handleMouseOver);
      hoverArea.style.pointerEvents = 'none';
    }

    return () => {
      hoverArea.removeEventListener('mouseover', handleMouseOver);
      hoverArea.removeEventListener('mouseout', handleMouseOut);

      cards.forEach((card) => {
        card.removeEventListener('mouseover', handleMouseOver);
        card.removeEventListener('mouseout', handleMouseOut);
        card.removeEventListener('click', (e) => {
          if (selectedCard === card) {
            console.log('Clicked on the selected card');
          } else {
            setSelectedCard(card);
          }
        });
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
          <div className="card-container">
            <img src="/images/martiniCard.png" alt="Card 4" className="card" key="card-4" />
            <div className="glow"></div>
          </div>
          <div className="card-container">
            <img src="/images/jokerCard.png" alt="Card 1" className="card" key="card-1" />
            <div className="glow"></div>
          </div>
          <div className="card-container">
            <img src="/images/floppyCard.png" alt="Card 2" className="card" key="card-2" />
            <div className="glow"></div>
          </div>
          <div className="card-container">
            <img src="/images/quillCard.png" alt="Card 3" className="card" key="card-3" />
            <div className="glow"></div>
          </div>
          <div className="overlay-bottom" ref={overlayBottomRef}></div>
          <img src="/images/pixelthumb.png" alt="Thumb" className="thumb" />
          <div className="overlay-top" ref={overlayTopRef}></div>
          <div className="card-background"></div>
          <div className = "shadow-container">
            <div className="card-shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hand;
