import React, { useEffect, useState } from 'react';

const TextDivider = ({ text }) => {

    const [gradientStop, setGradientStop] = useState(1.11);

    useEffect(() => {
      let direction = .01;
  
      const animateGradient = () => {
        setGradientStop((prev) => {
          if (prev >= 5.5) direction = -1;
          if (prev <= 1.215) direction = 1;
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
             height: '8vw',
             width: '100%',
             backgroundImage: `repeating-radial-gradient(
                 circle at 50%,
                 #7a7792 1vw,
                 #6d3b93 ${gradientStop}vw,
                 pink 1vw
               )`,
               filter: 'blur(2px)',
               backgroundSize: 'cover',
             margin: '20px 0',
             opacity: '.7',
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
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             color: 'white',
             fontSize: '3rem',
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             textAlign: 'center',
           }}
        >
           {text}
        </div>
      </div>
    );
  };

  export default TextDivider;