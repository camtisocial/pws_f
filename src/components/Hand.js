import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCardEffects from './Card';
import './Hand.css';

function Hand() {
  const overlayBottomRef = useRef(null);
  const overlayTopRef = useRef(null);
  const titleElement = document.querySelector('.title');
  const [selectedCard, setSelectedCard]= useState(null);
  const [title] = useState('Welcome');
  const navigate = useNavigate();

  useCardEffects(selectedCard, setSelectedCard, overlayBottomRef.current, overlayTopRef.current);

  useEffect(() => {
    const fish = document.querySelector('.fish');
    const cards = document.querySelectorAll('.card');
    const handContainer = document.querySelector('.hand-container');
    const hoverArea = document.querySelector('.hover-area');
    const overlayBottom = overlayBottomRef.current;
    const overlayTop = overlayTopRef.current;

    fish.addEventListener('mouseover', () => {
      console.log('Fish is hovering');
      fish.style.backgroundImage = "url('/images/CF2_less_pixels.png')";
      fish.style.opacity = '.6';
    });
    fish.addEventListener('mouseout', () => {
      fish.style.backgroundImage = "url('/images/CF1_less_pixels.png')";
      fish.style.opacity = '.6';
      console.log('Fish is no longer hovering');
    });

    function handleMouseOver() {
      handContainer.classList.add('raised');
    }


    function resetFocus() {
      handContainer.classList.add('raised');
      titleElement.classList.remove('off');
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

    cards.forEach((card) => {
      card.addEventListener('mouseover', handleMouseOver);
      card.addEventListener('click', (e) => {
        if (selectedCard === card) {
          setTimeout(() => {
          const altText = selectedCard.getAttribute('alt');
          switch (altText) {
            case 'Contact':
              navigate('/contact');
              console.log('Clicked on contact card');
              break;
            case 'Blog':
              navigate('/blog');
              console.log('Clicked on blog card');
              break;
            case 'About':
              navigate('/about');
              console.log('Clicked on about card');
              break;
            case 'GuestBook':
              navigate('/guestbook');
              console.log('Clicked on guestBook card');
              break;
            default:
              break;
          }
        }, 1500);

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
      titleElement.classList.remove('off');

      handContainer.classList.remove('raised');

      const cardContainer= selectedCard.parentElement;
      cardContainer.style.transition= 'transform 0.80s ease, z-index 1s ease';
      cardContainer.style.transform = `translate(13.5vw, -24vw)`;
      selectedCard.style.transition = 'transform 0.80s ease, z-index 0.80s ease';
      selectedCard.style.transform = '';


      overlayBottom.style.opacity = '1.0';
      overlayBottom.style.pointerEvents = 'auto';
      overlayTop.style.opacity = '1.0';
      overlayTop.style.pointerEvents = 'auto';

      selectedCard.removeEventListener('mouseover', handleMouseOver);
      hoverArea.style.pointerEvents = 'none';
    }

    return () => {
      hoverArea.removeEventListener('mouseover', handleMouseOver);

      cards.forEach((card) => {
        card.removeEventListener('mouseover', handleMouseOver);
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
  }, );

  return (
    <div>
    <div className="title"> {title} </div>
      <div className="shadow-overlay"></div>
      <div className="ashtray" style={{ backgroundImage: "url('/images/ashTray.png')"}}></div>
      <div className="smoke" style={{ backgroundImage: "url('/images/smoke.png')"}}></div>
      <div className="smoke2" style={{ backgroundImage: "url('/images/smoke.png')"}}></div>
      <div className="smoke3" style={{ backgroundImage: "url('/images/smoke.png')"}}></div>
      <div className="ashtray-glow" ></div>
      <div className="board" style={{ backgroundImage: "url('/images/dartBoard.png')"}}></div>
      <div className="route" style={{ backgroundImage: "url('/images/cut route.png')"}}></div>
      <div className="fish" style={{ backgroundImage: "url('/images/CF1_less_pixels.png')"}}></div>

      <div className="hover-area"></div>
      <div className="hand-shadow"></div>
      <div className="hand-container">
        <img src="/images/pixelhand.png" alt="Hand" className="hand" />
        <div className="cards">
          <div className="card-container">
            <img src="/images/martini.png" alt="Contact" className="card" key="card-4" />
          </div>
          <div className="card-container">
            <img src="/images/joker.png" alt="Blog" className="card" key="card-1" />
          </div>
          <div className="card-container">
            <img src="/images/floppyCard.png" alt="About" className="card" key="card-2" />
          </div>
          <div className="card-container">
            <img src="/images/quill.png" alt="GuestBook" className="card" key="card-3" />
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
