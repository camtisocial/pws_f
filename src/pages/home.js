import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>HOMEPAGE</h1>
      <nav>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/guestBook">Guest Book</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;