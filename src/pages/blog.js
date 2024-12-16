import React, { useState, useEffect } from 'react';
import '../css/blog.css';
import CardTilt from '../components/CardTilt';
import HomeButton from '../components/HomeButton';
import LoadingModal from '../components/LoadingModal';
import { useNavigate } from 'react-router-dom';


function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
         const response = await fetch('https://xxn01xl3vl.execute-api.us-east-2.amazonaws.com/fetchMDX');
         const data = await response.json();
         setPosts(data);
         setLoading(false);
         console.log(data);
      } catch (error) {
         console.error(error);
         setLoading(false);
      }
    }

  fetchPosts();
}, []);

useEffect(() => {
  const updateBlogListHeight = () => {
    const blogList = document.querySelector('.blog-list');
    if( blogList ) {
      const blogListHeight = blogList.scrollHeight;
      blogList.style.setProperty('--blog-list-height', `${blogListHeight}px`);
    }
  };

  updateBlogListHeight();

  window.addEventListener('resize', updateBlogListHeight);

  return () => {
    window.removeEventListener('resize', updateBlogListHeight);
  };
}, [posts]);


const handleCardClick = (post) => {
  const mdxContent = post.content;
  navigate(`/blogPost/${post.title}`, { state: { mdxContent } });
};


  return (
    <div className="blog">
      {loading && <LoadingModal />}
      <div className="blog-list">
        {posts.map((post) => {
          const _handleCardClick = () => handleCardClick(post);
          return (
          <CardTilt key={post.title}>
            <div
             className="blog-card"
             key={post.title} 
             onClick={_handleCardClick}>
              <div 
              className="blog-card-image"
              style={{backgroundImage: `url(${post.background})`}}>
                 <div className = "blog-card-content">
                   <h2>{post.title}</h2>
                   <p>{post.date}</p>
                   <p>{post.tags.join(', ')}</p>
                 </div>
              </div>
            </div>
          </CardTilt>
        )
       })}
      </div>
      <div>
        <HomeButton />
      </div>
    </div>
  );
}

export default Blog;
