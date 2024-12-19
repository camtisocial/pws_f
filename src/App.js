import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import GuestBook from './pages/guestBook';
import Blog from './pages/blog';
import BlogPost from './pages/blogPost';
import Contact from './pages/contact';
import About from './pages/about';
import './css/sriracha.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/guestBook" element={<GuestBook/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/blogPost/:filename" element={<BlogPost />} />
      </Routes>
    </div>
  );
}

export default App;
