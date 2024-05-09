import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../../components/context/BlogContext";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./EditBlog.css";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blogs, setBlogs } = useBlogs();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const blog = blogs.find((blog) => blog.id === parseInt(id));
    setTitle(blog.title);
    setBody(blog.body);
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleCancel = () => {
    navigate(`/blog/${id}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPost = {
      title: title,
      body: body,
    };

    axios
      .patch(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost)
      .then(() => {
        const updatedBlogs = blogs.map((blog) =>
          blog.id === parseInt(id) ? { ...blog, title, body } : blog
        );
        setBlogs(updatedBlogs);
        navigate(`/blog/${id}`);
      })
      .catch((error) => {
        console.error("Error updating post: ", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="containerForEditPost">
        <h2>Edit Post</h2>
        <div className="edit-blog">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
              spellCheck="false"
            />
            <textarea
              id="body"
              value={body}
              onChange={handleBodyChange}
              placeholder="Body"
              rows="10"
              spellCheck="false"
            />
            <div className="button-container">
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
