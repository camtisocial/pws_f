import React from 'react';
import Card from '../components/Card';
import Hand from '../components/Hand';
import '../css/home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to My Homepage</h1>
      <Hand />
      <div>
      </div>
    </div>
  );
}

export default Home;