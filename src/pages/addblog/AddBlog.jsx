import React, { useState } from "react";
import "./AddBlog.css";
import { useBlogs } from "../../components/context/BlogContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";

const AddBlog = () => {
  const { setBlogs } = useBlogs();
  const navigate = useNavigate();
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");

  const handleBodyChange = (e) => {
    setBodyText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitleText(e.target.value);
  };

  const handleCancelClick = () => {
    setTitleText("");
    setBodyText("");
    navigate("/");
  };

  const handlePostSubmit = () => {
    const newBlog = {
      userId: 99,
      title: titleText,
      body: bodyText,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", newBlog)
      .then((response) => {
        setBlogs((prevBlogs) => [response.data, ...prevBlogs]);
        handleCancelClick();
      })
      .catch((error) => {
        console.error("Error adding blog: ", error);
      });
  };

  return (
    <>
      <Navbar />

      <div className="containerForAddPost">
        <h1 className="titlee">Add Post</h1>
        <div className="add-blog">
          <form>
            <textarea
              autoFocus
              value={titleText}
              onChange={handleTitleChange}
              placeholder="Title..."
              rows="1"
              spellCheck="false"
            />
            <textarea
              spellCheck="false"
              value={bodyText}
              onChange={handleBodyChange}
              placeholder="What's on your mind?"
              rows="10"
            />
            <div className="button-container">
              <button type="button" onClick={handlePostSubmit}>
                Post
              </button>
              <button type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
