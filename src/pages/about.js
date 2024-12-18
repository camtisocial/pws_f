import React from 'react';
import '../components/HomeButton';
import '../css/about.css';
import HomeButton from '../components/HomeButton';
import { useNavigate } from 'react-router-dom';

function About() {

  const navigate = useNavigate();
  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div className="about"> {}
      <div className="decorative-grid" style={{ backgroundImage: "url('images/grid1.png')" }}></div>
      <div className="card-spread" style={{ backgroundImage: "url('images/cards.png')" }}></div>
      <div className="chips" style={{ backgroundImage: "url('images/chips.png')" }}></div>
      <div className="text-container">
        <div className="about-title" style={{ backgroundImage: "url('images/hello.png')" }}></div>
        <p className="about-text">
           Thanks for checking out my website. My goal with it was to make a fun interactive app where I could document my projects and occasionally do write ups on things that interest me. The front end is built with react and plain css. The backend is quite lightweight and runs on AWS lambda and S3 buckets. If you want to learn more about it or contact me, feel free to do so through the contact page or by text. Happy poking around. <br /><br />
           -Cameron Thompson <br /><br />
           <strong>Likes</strong>: cats, chess, scary movies, sichuan food, drum and bass <br />
           <strong>Dislikes</strong>: messy foods, minimalism (obviously) <br />
           <strong>Weapon of Choice</strong>: Halberd <br />
           <ul className="profile-links">
             <li><a href="https://github.com/camtisocial" target="_blank" rel="noopener noreferrer">♠ GitHub</a></li>
             <li><a href="https://www.linkedin.com/in/cameron-thompson-551a32249/" target="_blank" rel="noopener noreferrer">♣ LinkedIn</a></li>
             <li><a href="#" onClick={handleContactClick}>♦ Contact</a></li>
             <li><a href="https://lichess.org/@/timshael" target="_blank" rel="noopener noreferrer">♥ Lichess</a></li>
           </ul>
        </p>
      </div>
      <HomeButton />
    </div>
  );
}

export default About;
