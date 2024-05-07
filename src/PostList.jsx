import React, { useContext, useEffect } from "react";
import axios from "axios";
import { PostContext } from "./components/context/PostContext.jsx";

const PostList = () => {
  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);
};

export default PostList;
