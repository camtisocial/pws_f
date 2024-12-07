import React from 'react';
import '../components/HomeButton';
import '../css/about.css';
import HomeButton from '../components/HomeButton';

function About() {
  return (
    <div className="about"> {}
      <div className="decorative-grid" style={{ backgroundImage: "url('images/grid1.png')" }}></div>
      <div className="card-spread" style={{ backgroundImage: "url('images/cards.png')" }}></div>
      <div className="chips" style={{ backgroundImage: "url('images/chips.png')" }}></div>
      <div className="text-container">
        <div className="about-title" style={{ backgroundImage: "url('images/hello.png')" }}></div>
        <p className="about-text">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br /><br />
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br />
           <ul className="profile-links">
             <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">♠ GitHub</a></li>
             <li><a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">♣ LinkedIn</a></li>
             <li><a href="https://lichess.org/@/yourusername" target="_blank" rel="noopener noreferrer">♦ Contact</a></li>
             <li><a href="https://lichess.org/@/yourusername" target="_blank" rel="noopener noreferrer">♥ Lichess</a></li>
           </ul>
        </p>
      </div>
      <HomeButton />
    </div>
  );
}

export default About;
