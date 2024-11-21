import { useEffect } from 'react';

const useCardEffects = (selectedCard, setSelectedCard) => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const spreadAngle = 60; 
    const totalCards = cards.length;
    let bounds;

    function positionCards() {
      cards.forEach((card, index) => {
        if (card !== selectedCard) {
          const angle = (-spreadAngle / 2) + (index * (spreadAngle / (totalCards - 1)));
          card.style.transform = `rotate(${angle}deg) translateX(${index * 10 - (totalCards * 5)}px)`;
          card.style.zIndex = index - 1; 
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
      if (!selectedCard) return; // Ensure selectedCard is not null

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
      selectedCard.style.transitionDuration = '300ms'; // Speed up the 3D rotation animation
      selectedCard.style.transform = `
        translate(13vw, -25vw)
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 50},
          ${-center.x / 50},
          0,
          ${Math.log(distance) * 4}deg
        )
      `;
    }

    function applyCardEffects(card) {
      // Center card
      let translateX = 13;
      let translateY = -25;
      console.log(`translateX: ${translateX}, translateY: ${translateY}`);
      card.style.transform = `translate(${translateX}vw, ${translateY}vw)`;
      card.style.transition = 'transform 0.8s ease';
      card.style.zIndex = 6;

      // Prevent the overlay from blocking the centered card
      card.style.pointerEvents = 'none';

      // Add 3D effect
      bounds = card.getBoundingClientRect();

      if (selectedCard) {
        document.addEventListener('mousemove', rotateToMouse);
      }
    }

    if (selectedCard) {
      applyCardEffects(selectedCard);
    }

    cards.forEach((card) => {
      card.addEventListener('mouseover', hoverEffect);
      card.addEventListener('mouseout', positionCards);
      card.addEventListener('click', (e) => {
        if (selectedCard === card) {
          setSelectedCard(null);
          positionCards();
        } else {
          setSelectedCard(card);
          applyCardEffects(card);
        }
      });
      console.log('Event listeners added to card:', card); 
    });

    positionCards();

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseover', hoverEffect);
        card.removeEventListener('mouseout', positionCards);
        card.removeEventListener('click', (e) => {
          if (selectedCard === card) {
            setSelectedCard(null);
            positionCards();
          } else {
            setSelectedCard(card);
            applyCardEffects(card);
          }
        });
        console.log('Event listeners removed from card:', card);
      });
      document.removeEventListener('mousemove', rotateToMouse); // Clean up event listener
    };
  }, [selectedCard, setSelectedCard]); 
};

export default useCardEffects;