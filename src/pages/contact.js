import React, { useState, useEffect } from 'react';
import '../components/HomeButton';
import '../css/contact.css';
import HomeButton from '../components/HomeButton';

function Contact() {
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const pressElement = document.querySelector('.press');
    const paperElement = document.querySelector('.paper');
    const copyElements = document.querySelectorAll('[data-copy]');

    if (paperElement) {
      setTimeout(() => {
        paperElement.style.top = '15%';
      }, 300);
    }

    if (pressElement) {
      pressElement.addEventListener('click', handlePressClick);
    }

    copyElements.forEach(element => {
      element.addEventListener('click', handleCopyClick);
    });

    return () => {
      if (pressElement) {
        pressElement.removeEventListener('click', handlePressClick);
      }
      copyElements.forEach(element => {
        element.removeEventListener('click', handleCopyClick);
      });
    };
  }, []);

  const handlePressClick = (event) => {
    const sendElement = document.querySelector('.send');
    const sentElement = document.querySelector('.sent');
    const pressElement = event.currentTarget;
    console.log("PRESSED PRESSED PRESSED");
    pressElement.style.animation = 'pressAnimation .3s linear forwards';

    setTimeout(() => {
      sendElement.style.opacity = 0;
      sentElement.style.opacity = 1;
    }, 150);

    pressElement.addEventListener('animationend', () => {
      pressElement.style.animation = '';
    }, { once: true });

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                    Add lambda call here

    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    setMessage('');
  };

  const handleCopyClick = (event) => {
    const text = event.currentTarget.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(() => {
      setNotification('Copied');
      setTimeout(() => {
        setNotification('');
      }, 1000);
    });
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="contact">
      <div className="border1">
        <div className="s-container">
          <div className="press" style={{ backgroundImage: "url('images/press2.png')" }}></div>
          <div className="send" style={{ backgroundImage: "url('images/send1.png')" }}></div>
          <div className="sent" style={{ backgroundImage: "url('images/sent.png')" }}></div>
        </div>
        <div className="contact-container">
          <h1 className="contact-title">
            Cameron Thompson <br />
            Austin, Tx
          </h1>
          <ul className="contact-info">
            <li><a href="https://github.com/camtisocial" target="_blank" rel="noopener noreferrer">Github</a></li>
            <li><a href="https://www.linkedin.com/in/cameron-thompson-1b1b1b1b1/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li style= {{cursor: 'copy'}}><a data-copy="(208)-380-4866">(208)-380-4866</a></li>
            <li style= {{cursor: 'copy'}}><a data-copy="thompsonca99@gmail.com">thompsonca99@gmail.com</a></li>
          </ul>
            {notification && <div className="notification">{notification}</div>}
        </div>
        <div className="button-container" style={{ top: '-1vw', left: '-2vw', position: 'absolute' }}>
          <HomeButton />
        </div>
        <div className="letter-container">
          <div className="letter-back" style={{ backgroundImage: "url('images/letterBack.png')" }}></div>
          <div className="paper" style={{ backgroundImage: "url('images/paper.png')" }}>
            <textarea
              className="message-input"
              value={message}
              onChange={handleChange}
              placeholder="Type your message here..."
            />
          </div>
          <div className="letter-top" style={{ backgroundImage: "url('images/letterTop.png')" }}></div>
          <div className="letter-bottom" style={{ backgroundImage: "url('images/letterBottom.png')" }}></div>
        </div>
      </div>
    </div>
  );
}

export default Contact;