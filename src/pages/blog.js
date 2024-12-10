import React, { useState, useEffect } from 'react';
import '../css/blog.css';
import CardTilt from '../components/CardTilt';
import frontMatter from 'front-matter';
import HomeButton from '../components/HomeButton';
import { useNavigate } from 'react-router-dom';



function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetch('lambdaLink')
  //     .then((res) => res.json())
  //     // .then((data) => setPosts(JSON.parse(data)));
  // }, []);
  useEffect(() => {
  const mockData = [
    {
      filename: 'first-post.mdx',
      content: `
---
title: "My First Blog Post"
date: "2024-12-01"
tags: ["React", "MDX", "AWS"]
---
# My First Blog Post
This is the content of the first post.
      `,
    },
    {
      filename: 'second-post.mdx',
      content: `
---
title: "Another Blog Post"
date: "2024-12-08"
tags: ["JavaScript", "S3", "Lambda"]
---
# Another Blog Post
This is the content of the second post.
      `,
    },
  ];

  const parsedPosts = mockData.map((post) => {
    const { attributes: metadata, body: content } = frontMatter(post.content);
    const { title, date, tags } = metadata; 
    return {
      filename: post.filename,
      title,
      date, 
      tags: tags || [], 
      content,
    };
  });

  setPosts(parsedPosts);
}, []);

const handleCardClick = (filename) => {
  navigate(`/blog/${filename}`);
};

  return (
    <div className="blog">
      <div className="blog-list">
        {posts.map((post) => (
          <CardTilt key={post.filename}>
            <div className="blog-card" key={post.filename} onClick={() => handleCardClick(post.filename)}>
              <h2>{post.title}</h2>
              <p>{post.date}</p>
              <p>{post.tags.join(', ')}</p>
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
