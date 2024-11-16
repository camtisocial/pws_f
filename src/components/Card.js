import { useEffect } from 'react';

const useCardEffects = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const spreadAngle = 40; 
    const totalCards = cards.length;

    function positionCards() {
      cards.forEach((card, index) => {
        const angle = (-spreadAngle / 2) + (index * (spreadAngle / (totalCards - 1)));
        card.style.transform = `rotate(${angle}deg) translateX(${index * 10 - (totalCards * 5)}px)`;
      });
    }

    function hoverEffect(e) {
      console.log('Hover effect triggered');
      const hoveredIndex = Array.from(cards).indexOf(e.target);

      cards.forEach((card, index) => {
        if (index < hoveredIndex) {
          card.style.transform = `translateX(-10px) rotate(-5deg)`;
        } else if (index === hoveredIndex) {
          card.style.transform = `translateY(-20px) rotate(0deg) scale(1.1)`;
        } else {
          card.style.transform = `translateX(10px) rotate(5deg)`;
        }
      });
    }

    function resetPositions() {
      console.log('Reset positions triggered'); // Debugging
      positionCards();
    }

    cards.forEach((card) => {
      card.addEventListener('mouseover', hoverEffect);
      card.addEventListener('mouseout', resetPositions);
    });

    positionCards();

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseover', hoverEffect);
        card.removeEventListener('mouseout', resetPositions);
      });
    };
  }, []); 
};

export default useCardEffects;