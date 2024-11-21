import { useEffect } from 'react';

const useCardEffects = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const spreadAngle = 60; 
    const totalCards = cards.length;

    function positionCards() {
      cards.forEach((card, index) => {
        const angle = (-spreadAngle / 2) + (index * (spreadAngle / (totalCards - 1)));
        card.style.transform = `rotate(${angle}deg) translateX(${index * 10 - (totalCards * 5)}px)`;
        card.style.zIndex = index-1; 
      });
    }

    function hoverEffect(e) {
      const hoveredIndex = Array.from(cards).indexOf(e.target);
      const raiseAmount = 35;

      cards.forEach((card, index) => {
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
      });
    }

    cards.forEach((card) => {
      card.addEventListener('mouseover', hoverEffect);
      card.addEventListener('mouseout', positionCards);
      console.log('Event listeners added to card:', card); 
    });

    positionCards();

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseover', hoverEffect);
        card.removeEventListener('mouseout', positionCards);
        console.log('Event listeners removed from card:', card);
      });
    };
  }, []); 
};

export default useCardEffects;