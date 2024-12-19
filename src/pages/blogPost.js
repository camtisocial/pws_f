import React, { useMemo, useState, useEffect } from 'react';
import './blogPost.css';
import { useLocation } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { evaluate } from '@mdx-js/mdx';
import HomeButton from '../components/HomeButton';
import Quote from '../components/quoteBlock';
import TextDivider from '../components/TextDivider';
import * as runtime from 'react/jsx-runtime';

const BlogPost = () => {
  const location = useLocation();
  const { mdxContent } = location.state;

  const [MDXContent, setMDXContent] = useState(null);

  const components =  useMemo(() => ({
    HomeButton, 
    TextDivider,
    Quote,
    h1: (props) => <h1 className="FUCK-CSS-title" {...props} />,

  }), []);


  useEffect(() => {
    const compileMDX = async () => {
      const { default: MDXComponent } = await evaluate(mdxContent, {
        ...runtime,
        React,
        useMDXComponents: () => components,
      });
      setMDXContent(() => MDXComponent);
    };

    compileMDX();
  }, [mdxContent, components]);

  if (!MDXContent) return <p>Loading...</p>;

// console.log("MDXContent", MDXContent);

  console.log("Components", components);
  return (
    <div className="blog-postzz">
      <div className="blog-post-background">
        <MDXProvider components={components}>
          <div className="article">
            {console.log("MDXContent", MDXContent)}
            <MDXContent />
            {/* <h1 className= "title">Test</h1> */}
          </div>
        </MDXProvider>
      </div>
    </div>
  );
};

export default BlogPost;