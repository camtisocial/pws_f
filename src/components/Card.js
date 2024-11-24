import { useEffect } from 'react';

const useCardEffects = (selectedCard, setSelectedCard) => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    let backgroundElement = document.querySelector('.card-background');
    let backgroundShadow = document.querySelector('.card-shadow');
    const spreadAngle = 60; 
    const totalCards = cards.length;
    // let translateX = 13;
    // let translateY = -15;
    let translateX = 0;
    let translateY = 0;
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
      selectedCard.style.transformOrigin = 'center center';
      const maxRotation = 35;
      const rotateX = -(center.y / (bounds.height / 2)) * maxRotation;
      const rotateY = (center.x / (bounds.width / 2)) * maxRotation;

      // Calculate the distance from the center of the card
      const distanceFromCenter = Math.sqrt(center.x ** 2 + center.y ** 2);
      const maxDistance = Math.sqrt((bounds.width / 2) ** 2 + (bounds.height / 2) ** 2);
      const perspective = 1000; // Adjust perspective value for a more pronounced 3D effect

      // Interpolate the shadow height based on the mouse position
      const minShadowHeight = 20; // in vw
      const maxShadowHeight = 22.5; // in vw
      const shadowHeight = minShadowHeight + ((topY / bounds.height) * (maxShadowHeight - minShadowHeight));

      selectedCard.style.transitionDuration = '60ms'; // Speed up the 3D rotation animation
      selectedCard.style.transform = `
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;

      // selectedCard.style.transitionDuration = '60ms'; // Speed up the 3D rotation animation
      // selectedCard.style.transform = `
      //   perspective(${perspective}px)
      //   rotateX(${rotateX}deg)
      //   rotateY(${rotateY}deg)
      //   translate(${translateX}vw, ${translateY}vw)
      // `;
      backgroundElement.style.transition = 'transform 200ms ease'; // Speed up the 3D rotation animation
      backgroundElement.style.transform = `
        perspective(${perspective}px)
        translate(-10vw, -12vw)
        rotateX(${rotateX * 0.3}deg)
        rotateY(${rotateY * 0.3}deg)
      `;

      backgroundShadow.style.transition = 'transform 60ms ease, opacity 0.5s ease, height 500ms ease'; // Add height transition
      backgroundShadow.style.height = `${shadowHeight}vw`;
      backgroundShadow.style.opacity = '0.7';
      backgroundShadow.style.transform = `
        perspective(${perspective}px)
        translate(-10vw, -10vw)
        rotateX(${rotateX * 0.8}deg)
        rotateY(${rotateY * 0.8}deg)
      `;

      // Update the glow effect position
      // const glowEffect = selectedCard.parentElement.querySelector('.glow');
      // if (glowEffect) {
      //   glowEffect.style.backgroundImage = `
      //     radial-gradient(
      //       circle at
      //       ${center.x * 2 + bounds.width / 2}px
      //       ${center.y * 2 + bounds.height / 2}px,
      //       #ffffff55,
      //       #0000000f
      //     )
      //   `;
      // }
    }

    function HandleMouseOutSelected() {
      backgroundElement.style.transitionDuration = 'transform 1900ms';
      backgroundElement.style.transform = `translate(-10vw, -12vw)`;
      backgroundShadow.style.transitionDuration = 'transform 1900ms';
      backgroundShadow.style.transform = `translate(-10vw, -10vw)`;
      backgroundShadow.style.transition = 'opacity 0.7s ease';
      backgroundShadow.style.opacity = '0';
      selectedCard.style.transform = `translate(${translateX}vw, ${translateY}vw)`;
      selectedCard.style.transformOrigin = 'bottom center';
      selectedCard.style.transitionDuration = '300ms';
      const glowEffect = selectedCard.parentElement.querySelector('.glow');
      if (glowEffect) {
        glowEffect.style.opacity = '0';
      }
    }

    function applyCardEffects(card) {

      const centerContainer = document.querySelector('.center-container');
      centerContainer.appendChild(card);

      console.log(`translateX: ${translateX}, translateY: ${translateY}`);
      card.style.transform = `translate(${translateX}vw, ${translateY}vw)`;
      card.style.transition = 'transform 0.8s ease';
      card.style.zIndex = 6;
      backgroundElement.style.transform = `translate(-10vw, -12vw)`;
      backgroundShadow.style.transform = `translate(-10vw, -12vw)`;

      // Add the glow effect
      const glowEffect = card.parentElement.querySelector('.glow');
      if (glowEffect) {
        glowEffect.style.opacity = '1';
      }

      setTimeout(() => {
        backgroundElement.style.transition = 'opacity 1s ease';
        backgroundElement.style.opacity = '1';
        backgroundShadow.style.transition = 'opacity 1s ease';
        backgroundShadow.style.opacity = '0.7';
      }, 350);
      setTimeout(() => {
        bounds = card.getBoundingClientRect();
        card.addEventListener('mousemove', rotateToMouse);
        card.addEventListener('mouseout', HandleMouseOutSelected);
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
            selectedCard.classList.remove('selected'); // Remove selected class
            backgroundElement.style.opacity = '0'; // Hide the background element
            backgroundShadow.style.opacity = '0'; // Hide the shadow element
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