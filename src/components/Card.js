import { useEffect } from 'react';

const useCardEffects = (selectedCard, setSelectedCard) => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const spreadAngle = 60; 
    const totalCards = cards.length;
    let translateX = 13;
    let translateY = -25;
    let bounds;

    function positionCards() {
      cards.forEach((card, index) => {
         if (card !== selectedCard) {
           const angle = (-spreadAngle / 2) + (index * (spreadAngle / (totalCards - 1)));
           card.style.transform = `rotate(${angle}deg) translateX(${index * 10 - (totalCards * 5)}px)`;
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
      const maxRotation = 25;
      const rotateX = (center.y / (bounds.height / 2)) * maxRotation;
      const rotateY = -(center.x / (bounds.width / 2)) * maxRotation;
      selectedCard.style.transitionDuration = '60ms'; // Speed up the 3D rotation animation
      selectedCard.style.transform = `
        translate(13vw, -25vw)
        scale3d(1.10, 1.10, 1.10)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg
        )
      `;
    }

    function HandleMouseOutSelected() {
      selectedCard.style.transform = `translate(${translateX}vw, ${translateY}vw)`;
      selectedCard.style.transitionDuration = '300ms';
    }

    function add3dCssEffects() {
      selectedCard.style.perspective = '1000px';
    }

    function applyCardEffects(card) {
      console.log(`translateX: ${translateX}, translateY: ${translateY}`);
      card.style.transform = `translate(${translateX}vw, ${translateY}vw)`;
      card.style.transition = 'transform 0.8s ease';
      card.style.zIndex = 6;

      setTimeout(() => {
      bounds = card.getBoundingClientRect();
      card.addEventListener('mousemove', rotateToMouse);
      card.addEventListener('mouseout', HandleMouseOutSelected);
      card.classList.add('selected');
      card.style.perspective = '2000px';
      }, 800);
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

    positionCards();

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseover', hoverEffect);
        card.removeEventListener('mouseout', positionCards);
        card.removeEventListener('mousemove', rotateToMouse)
        card.removeEventListener('mouseout', HandleMouseOutSelected)
      });
    };
  }, [selectedCard, setSelectedCard]); 
};

export default useCardEffects;