import React, { useEffect, useState } from 'react';

const TextDivider = ({ text, style }) => {

    const [gradientStop, setGradientStop] = useState(1.31);

    useEffect(() => {
      let direction = .01;
  
      const animateGradient = () => {
        setGradientStop((prev) => {
          if (prev >= 5.5) direction = -1;
          if (prev <= 1.32) direction = 1;
          return prev + direction * 0.00055;
        });
        requestAnimationFrame(animateGradient);
      };
  
      animateGradient();
    }, []);
return( 
    <div style={{display: 'flex', position: 'relative'}}>
        {/*Animated Gradient*/}

        <div
           style={{
             height: '9vw',
             width: '100%',
             backgroundImage: `repeating-radial-gradient(
                 circle at 50%,
                 #7a7792 1vw,
                 #6d3b93 ${gradientStop}vw,
                 pink 1vw
               )`,
               filter: 'blur(2px) brightness(1.5)',
               backgroundSize: 'cover',
             margin: '20px 0',
             opacity: '.5',
             display: 'flex',
             borderRadius: '500px',
             border: '.2vw solid purple',
             position: 'relative',
           }}
         />

        {/*Text Div*/}

         <div 
           style={{
             position: 'absolute',
             marginTop: '.2vw',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%) scaleX(1.1)',
             color: 'transparent',
             fontSize: '8.5vw',
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             textAlign: 'center',
             fontFamily: 'SrirachaFont',
             textShadow: ' .1vw .1vw .1vw #000',
             letterSpacing: '0.1vw',
             whiteSpace: 'nowrap',
             background: 'linear-gradient(to right, #00ea1b, #ea00cf)',
             WebkitBackgroundClip: 'text',
             WebkitTextStroke: '.05vw #000',
             ...style,
           }}
        >
           {text}
        </div>
      </div>
    );
  };

  export default TextDivider;