import React, { useState, useEffect } from 'react';
import '../css/blog.css';
import CardTilt from '../components/CardTilt';
import HomeButton from '../components/HomeButton';
import exampleMDX from './example.mdx';
import { useNavigate } from 'react-router-dom';



function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   fetch('lambdaLink')
  //     .then((res) => res.json())
  //     .then((data) => setPosts(JSON.parse(data)));
  // }, []);
  useEffect(() => {
  const mockData = [
    {
      filename: 'first-post.mdx',
      title: 'My First Blog Post',
      date: '2024-12-01',
      tags: ['React', 'MDX', 'AWS'],
      backgroundImageUrl: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2pjeXNpMWZrdmR5NGlxNG5wdW13YjJjZmk1dHE5MTg5Z2t1eTVnMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Rlwz4m0aHgXH13jyrE/giphy.webp',
      content: exampleMDX,
    },

  ];

  console.log(mockData[0].content);

  setPosts(mockData);
}, []);


useEffect(() => {
  const updateBlogListHeight = () => {
    const blogList = document.querySelector('.blog-list');
    const blogListHeight = blogList.scrollHeight;
    blogList.style.setProperty('--blog-list-height', `${blogListHeight}px`);
  };

  updateBlogListHeight();

  window.addEventListener('resize', updateBlogListHeight);

  return () => {
    window.removeEventListener('resize', updateBlogListHeight);
  };
}, [posts]);


const handleCardClick = async (post) => {
  const response = await fetch(post.content);
  const mdxContent = await response.text();
  navigate(`/blogPost/${post.filename}`, { state: { mdxContent } });
};

  return (
    <div className="blog">
      <div className="blog-list">
        {posts.map((post) => (
          <CardTilt key={post.filename}>
            <div
             className="blog-card"
             key={post.filename} 
             onClick={() => handleCardClick(post)}>
              <div 
              className="blog-card-image"
              style={{backgroundImage: `url(${post.backgroundImageUrl})`}}>
                 <div className = "blog-card-content">
                   <h2>{post.title}</h2>
                   <p>{post.date}</p>
                   <p>{post.tags.join(', ')}</p>
                 </div>
              </div>
            </div>
          </CardTilt>
        ))}
      </div>

      <div>
        <HomeButton />
      </div>
    </div>
  );
}

export default Blog;
