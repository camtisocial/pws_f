import { useEffect, useRef } from 'react';

const useCardEffects = (selectedCard, setSelectedCard, overlayBottom, overlayTop) => {
  const initialTitleSet = useRef(false);
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    let backgroundShadow = document.querySelector('.card-shadow');
    const spreadAngle = 60; 
    const totalCards = cards.length;
    let translateX = 0;
    let translateY = 0;
    let bounds;

    const titleElement = document.querySelector('.title');
    if (titleElement && !initialTitleSet.current) {
      setTimeout(() => {
      titleElement.textContent = 'Welcome';
      titleElement.classList.add('flicker');
      titleElement.addEventListener('animationend', () => {
        titleElement.classList.remove('flicker');
        titleElement.classList.add('neon-blink');
      }, { once: true });
      initialTitleSet.current = true;
      }, 400);
    }

    function positionCards() {
      cards.forEach((card, index) => {
         if (card !== selectedCard) {
           const angle = (-spreadAngle / 2) + (index * (spreadAngle / (totalCards - 1)));
           card.style.transform = `rotate(${angle}deg) translateX(${index * 10 - (totalCards * 5)}px)`;
           card.style.perspective = '0px';
           card.style.zIndex = index - 1; 
           setTimeout(() => {
            card.addEventListener('mouseover', titleEffect);
            card.style.transition = 'transform 0.25s ease';
           }, 300);
         }
      });
    }

    function hoverEffect(e) {
      const hoveredIndex = Array.from(cards).indexOf(e.target);
      const raiseAmount = 35;

      cards.forEach((card, index) => {
        if (card !== selectedCard) {
          const baseAngle = (-spreadAngle / 2) + (index * (spreadAngle / (totalCards - 1)));
          let selectedAngle;
          if (index === hoveredIndex && index === 0) {
            selectedAngle = baseAngle - 5;
          } else if (index === hoveredIndex && index === 1) {
            selectedAngle = baseAngle - 5;
          } else if (index === hoveredIndex && index === 2) {
            selectedAngle = baseAngle - 2;
          } else if (index === hoveredIndex && index === 3) {
            selectedAngle = baseAngle + 1;
          }
          card.style.transform = `rotate(${selectedAngle}deg) translateY(-${raiseAmount}px)`;

        }
      });
    }

    function titleEffect(e) {
      let titleCard = e.target;
      const titleElement = document.querySelector('.title');
        if (titleElement) {
          if (titleElement.textContext !== titleCard.getAttribute('alt')) {
           titleElement.textContent= titleCard.getAttribute('alt');
           titleElement.classList.remove('neon-blink');
           titleElement.classList.add('flicker');
           titleElement.addEventListener('animationend', () => {
             titleElement.classList.remove('flicker');
             titleElement.classList.add('neon-blink');
           }, { once: true });
        } else {
          titleElement.classList.add('neon-blink');
        }
        }
    }


    function rotateToMouse(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };
      const maxRotation = 20;
      const rotateX = -(center.y / (bounds.height / 2)) * maxRotation;
      const rotateY = (center.x / (bounds.width / 2)) * maxRotation;
      const perspective = 1000;

      selectedCard.parentElement.style.setProperty(`--mouse-x`, `${leftX}px`);
      selectedCard.parentElement.style.setProperty(`--mouse-y`, `${topY}px`);
      selectedCard.parentElement.style.setProperty(`--hover-opacity`, `0.15`);
      selectedCard.style.transformOrigin = 'center center';
      selectedCard.style.transitionDuration = '60ms';
      selectedCard.style.transform = `
        scale3d(1.1, 1.1, 1.1)
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
      backgroundShadow.style.transition = 'transform 60ms ease, opacity 0.5s ease, height 500ms ease';
      backgroundShadow.style.opacity = '0.8';
      backgroundShadow.style.transform = `
        perspective(${perspective}px)
        rotateX(${rotateX * 0.8}deg)
        rotateY(${rotateY * 0.8}deg)
      `;
    }

    function funCardFlip(e) {
      if (e.button === 0) {
        let card = e.target;
        card.removeEventListener('mousemove', rotateToMouse);
        card.removeEventListener('mouseout', handleMouseOutSelected);
        card.style.transitionDuration = '500ms';
        card.style.transform = `scale3d(1.1, 1.1, 1.1)`;
        card.style.animation = 'flip 2s';
        backgroundShadow.style.animation = 'flip 2.2s';
        setTimeout(() => {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          backgroundShadow.style.opacity = '0';
        }, 1800);


      }
    }

    function handleOverlayClick() {
      backgroundShadow.style.transition = 'opacity 0.15s ease';
      backgroundShadow.style.opacity = '0';
      const titleElement = document.querySelector('.title');
      console.log('clicked overlay');
      overlayBottom.removeEventListener('click', handleOverlayClick);
      overlayTop.removeEventListener('click', handleOverlayClick);
      cards.forEach((card) => {
        console.log('removing event listeners');
        card.parentElement.classList.remove('shadow');
        card.removeEventListener('mousemove', rotateToMouse);
        card.removeEventListener('mouseout', handleMouseOutSelected);
        card.removeEventListener('mousedown', funCardFlip);
        card.style.transformOrigin = 'bottom center';
      });
      setTimeout(() => {
        titleElement.style.zIndex = 1;
      } , 500);
    }

    function handleMouseOutSelected() {
      backgroundShadow.style.transitionDuration = 'transform 1900ms';
      backgroundShadow.style.transform = '';
      backgroundShadow.style.opacity = '0';
      selectedCard.style.transitionDuration = '500ms';
      selectedCard.style.transform = `translate(${translateX}vw, ${translateY}vw)`;
      selectedCard.parentElement.style.setProperty(`--hover-opacity`, `0`);
    }

    function applyCardEffects(card) {
      const titleElement = document.querySelector('.title');
      titleElement.classList.remove('flicker');
      titleElement.classList.add('neon-blink');
      titleElement.style.zIndex = 0;

      card.removeEventListener('mouseover', titleEffect);
      setTimeout(() => {
        card.style.zIndex = 100;
        card.parentElement.style.zIndex = 100;
      }, 100);
      setTimeout(() => {
        bounds = card.getBoundingClientRect();
        card.addEventListener('mousemove', rotateToMouse);
        card.addEventListener('mouseout', handleMouseOutSelected);
        card.addEventListener('mousedown', funCardFlip);
      }, 800);
    }


    if (overlayBottom && overlayTop) {
      overlayBottom.addEventListener('click', handleOverlayClick);
      overlayTop.addEventListener('click', handleOverlayClick);
    }


    cards.forEach((card) => {
      if (card === selectedCard) {
        applyCardEffects(card);
        card.parentElement.classList.add('shadow');
      } else {
        card.addEventListener('mouseover', hoverEffect);
        card.addEventListener('mouseout', positionCards);
        positionCards();
      }
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseover', hoverEffect);
        card.removeEventListener('mouseover', titleEffect);
        card.removeEventListener('mouseout', positionCards);
        card.removeEventListener('mousemove', rotateToMouse);
        card.removeEventListener('mouseout', handleMouseOutSelected);
      });
    };
  }, [selectedCard, setSelectedCard, overlayBottom, overlayTop]); 
};

export default useCardEffects;