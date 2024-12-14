import React from 'react';
import './blogPost.css';
import { useLocation } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';


const BlogPost = () => {
  const location = useLocation();
  const { mdxContent } = location.state;

  return (
    <div className="blog-postzz">
      <MDXProvider>
        <div>{mdxContent}</div>
      </MDXProvider>
    </div>
  );
};

export default BlogPost;

