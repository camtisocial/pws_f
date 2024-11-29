import { useEffect } from 'react';

const useCardEffects = (selectedCard, setSelectedCard, overlayBottom, overlayTop) => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    let backgroundShadow = document.querySelector('.card-shadow');
    const spreadAngle = 60; 
    const totalCards = cards.length;
    let translateX = 0;
    let translateY = 0;
    let bounds;

    function positionCards() {
      cards.forEach((card, index) => {
         if (card !== selectedCard) {
           const angle = (-spreadAngle / 2) + (index * (spreadAngle / (totalCards - 1)));
           card.style.transform = `rotate(${angle}deg) translateX(${index * 10 - (totalCards * 5)}px)`;
           card.style.perspective = '0px';
           card.style.zIndex = index - 1; 
           setTimeout(() => {
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
      const perspective = 1000; // Adjust perspective value for a more pronounced 3D effect

      selectedCard.parentElement.style.setProperty(`--mouse-x`, `${leftX}px`);
      selectedCard.parentElement.style.setProperty(`--mouse-y`, `${topY}px`);
      selectedCard.parentElement.style.setProperty(`--hover-opacity`, `0.15`);
      selectedCard.style.transformOrigin = 'center center';
      selectedCard.style.transitionDuration = '60ms'; // Speed up the 3D rotation animation
      selectedCard.style.transform = `
        scale3d(1.1, 1.1, 1.1)
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
      backgroundShadow.style.transition = 'transform 60ms ease, opacity 0.5s ease, height 500ms ease'; // Add height transition
      backgroundShadow.style.opacity = '0.7';
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
      console.log('clicked overlay');
      overlayBottom.removeEventListener('click', handleOverlayClick);
      overlayTop.removeEventListener('click', handleOverlayClick);
      cards.forEach((card) => {
        console.log('removing event listeners');
        card.removeEventListener('mousemove', rotateToMouse);
        card.removeEventListener('mouseout', handleMouseOutSelected);
        card.removeEventListener('mousedown', funCardFlip);
        card.style.transformOrigin = 'bottom center';
      });
    }

    function handleMouseOutSelected() {
      console.log('MOUSE OUT TRIGGERED');
      backgroundShadow.style.transitionDuration = 'transform 1900ms';
      backgroundShadow.style.transform = '';
      backgroundShadow.style.opacity = '0';
      selectedCard.style.transitionDuration = '500ms';
      selectedCard.style.transform = `translate(${translateX}vw, ${translateY}vw)`;
      selectedCard.parentElement.style.setProperty(`--hover-opacity`, `0`);
    }

    function applyCardEffects(card) {
      setTimeout(() => {
        card.style.zIndex = 100;
        card.parentElement.style.zIndex = 100;
      }, 100);
      setTimeout(() => {
        bounds = card.getBoundingClientRect();
        card.addEventListener('mousemove', rotateToMouse);
        selectedCard.addEventListener('mouseout', handleMouseOutSelected);
        selectedCard.addEventListener('mousedown', funCardFlip);
      }, 800);
    }

    if (overlayBottom && overlayTop) {
      overlayBottom.addEventListener('click', handleOverlayClick);
      overlayTop.addEventListener('click', handleOverlayClick);
    }

    if (selectedCard) {
      applyCardEffects(selectedCard);
    } else {
      positionCards();
    }

    cards.forEach((card) => {
      card.addEventListener('mouseover', hoverEffect);
      card.addEventListener('mouseout', positionCards);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseover', hoverEffect);
        card.removeEventListener('mouseout', positionCards);
        card.removeEventListener('mousemove', rotateToMouse);
        card.removeEventListener('mouseout', handleMouseOutSelected);
      });
    };
  }, [selectedCard, setSelectedCard, overlayBottom, overlayTop]); 
};

export default useCardEffects;