import { useEffect } from 'react';

const useCardEffects = (selectedCard, setSelectedCard) => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    let backgroundElement = document.querySelector('.card-background');
    let backgroundShadow = document.querySelector('.card-shadow');
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
      const rotateX = 1.3 * (center.y / (bounds.height / 2)) * maxRotation;
      const rotateY = -(center.x / (bounds.width / 2)) * maxRotation;

      // Calculate the distance from the center of the card
      const distanceFromCenter = Math.sqrt(center.x ** 2 + center.y ** 2);
      const maxDistance = Math.sqrt((bounds.width / 2) ** 2 + (bounds.height / 2) ** 2);
      const perspective = 4000 - (distanceFromCenter / maxDistance) * 500; // Adjust perspective based on distance

      const skewX = (center.x / bounds.width) * 3; 
      const skewY = (center.y / bounds.height) * 3;

      selectedCard.style.transitionDuration = '60ms'; // Speed up the 3D rotation animation
      selectedCard.style.transform = `
        translate(13vw, -25vw)
        scale3d(1.10, 1.10, 1.10)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        skewX(${skewY}deg)
        skewY(${skewX}deg)
        perspective(${perspective}px)
      `;

      backgroundElement.style.transition = 'transform 200ms ease'; // Speed up the 3D rotation animation
      backgroundElement.style.transform = `
        translate(-10vw, -12vw)
        rotateX(${rotateX * 0.3}deg)
        rotateY(${rotateY * 0.3}deg)
        perspective(${perspective}px)
      `;

      backgroundShadow.style.transition = 'transform 60ms ease'; // Speed up the 3D rotation animation
      backgroundShadow.style.transition = 'opacity 0.5s ease';
      backgroundShadow.style.height = '22vw';
      backgroundShadow.style.opacity = '0.7';
      backgroundShadow.style.transform = `
        translate(-10vw, -10vw)
        scale3d(1.10, 1.10, 1.10)
        rotateX(${rotateX * 0.8}deg)
        rotateY(${rotateY * 0.8}deg)
        skewX(${skewY * 0.8}deg)
        skewY(${skewX * 0.8}deg)
      `;
    }

    function HandleMouseOutSelected() {
      backgroundElement.style.transitionDuration = 'transform 1900ms';
      backgroundElement.style.transform = `translate(-10vw, -12vw)`;
      backgroundShadow.style.transitionDuration = 'transform 1900ms';
      backgroundShadow.style.transform = `translate(-10vw, -10vw)`;
      backgroundShadow.style.transition = 'opacity 0.7s ease';
      backgroundShadow.style.opacity = '0';
      selectedCard.style.transform = `translate(${translateX}vw, ${translateY}vw)`;
      selectedCard.style.transitionDuration = '300ms';
    }

    function applyCardEffects(card) {
      console.log(`translateX: ${translateX}, translateY: ${translateY}`);
      card.style.transform = `translate(${translateX}vw, ${translateY}vw)`;
      card.style.transition = 'transform 0.8s ease';
      card.style.zIndex = 6;
      backgroundElement.style.transform = `translate(-10vw, -12vw)`;
      backgroundShadow.style.transform = `translate(-10vw, -12vw)`;

      setTimeout(() => {
        backgroundElement.style.transition = 'opacity 1s ease';
        backgroundElement.style.opacity = '1';
        // backgroundShadow.style.transition = 'opacity 1s ease';
        // backgroundShadow.style.opacity = '0.7';
      }, 350);
      setTimeout(() => {
        bounds = card.getBoundingClientRect();
        card.addEventListener('mousemove', rotateToMouse);
        card.addEventListener('mouseout', HandleMouseOutSelected);
        card.style.perspective = '2000px';
        card.classList.add('.card.glow');
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
      card.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from propagating to the document
        if (selectedCard === card) {
          console.log('Clicked on the selected card');
        } else {
          if (selectedCard) {
            selectedCard.classList.remove('card-glow'); // Remove the glow effect from the previously selected card
            selectedCard.classList.remove('selected'); // Remove selected class
          }
          setSelectedCard(card);
        }
      });
      console.log('Event listeners added to card:', card); 
    });

    return () => {
      backgroundElement.style.transition = 'opacity 0.25s ease';
      backgroundElement.style.opacity = '0';
      backgroundShadow.style.transition = 'opacity 0.25s ease';
      backgroundShadow.style.opacity = '0';
      cards.forEach((card) => {
        card.removeEventListener('mouseover', hoverEffect);
        card.removeEventListener('mouseout', positionCards);
        card.removeEventListener('mousemove', rotateToMouse);
        card.removeEventListener('mouseout', HandleMouseOutSelected);
      });
    };
  }, [selectedCard, setSelectedCard]); 
};

export default useCardEffects;