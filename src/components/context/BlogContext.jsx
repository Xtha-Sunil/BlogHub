import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BlogContext = createContext();

export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs: ", error);
      });
  }, [setBlogs]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments: ", error);
      });
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, comments, setComments }}>
      {children}
    </BlogContext.Provider>
  );
};
