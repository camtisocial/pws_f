import React, { useState, useEffect } from 'react';
import './blogPost.css';
import { useLocation } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

const BlogPost = () => {
  const location = useLocation();
  const { mdxContent } = location.state;

  const [MDXContent, setMDXContent] = useState(null);

  useEffect(() => {
    const compileMDX = async () => {
      const { default: MDXComponent } = await evaluate(mdxContent, {
        ...runtime,
        React,
        useMDXComponents: () => {},
      });
      setMDXContent(() => MDXComponent);
    };

    compileMDX();
  }, [mdxContent]);

  if (!MDXContent) return <p>Loading...</p>;

  return (
    <div className="blog-postzz">
      <MDXProvider>
        <MDXContent />
      </MDXProvider>
    </div>
  );
};

export default BlogPost;