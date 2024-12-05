import React from 'react';
import '../components/BackButton';
import '../css/about.css';
import BackButton from '../components/BackButton';

function About() {
  return (
    <div className="about"> {}
      <div className="decorative-grid" style={{ backgroundImage: "url('images/grid1.png')" }}></div>
      <div className="card-spread" style={{ backgroundImage: "url('images/cards.png')" }}></div>
      <div className="chips" style={{ backgroundImage: "url('images/chips.png')" }}></div>
    <BackButton />
      <h2 className="about-title">TITLE</h2>{}
    </div>
  );
}

export default About;
