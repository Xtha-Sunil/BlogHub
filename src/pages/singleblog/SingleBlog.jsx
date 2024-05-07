import React, { useState, useEffect } from "react";
import "./SingleBlog.css";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../../components/context/BlogContext";
import NotFound from "../notfound/NotFound";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, setBlogs, comments, setComments } = useBlogs();
  const [currBlog, setCurrBlog] = useState(null);
  const [isEditing, setEditing] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState("");

  useEffect(() => {
    setCurrBlog(blogs.find((blog) => blog.id === parseInt(id)));
  }, [id]);

  if (!currBlog) return <NotFound />;

  const currComments = comments.filter(
    (comment) => comment.postId === currBlog.id
  );

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const submitComment = () => {
    if (!newComment.trim()) {
      alert("Empty comment");
      return;
    }

    const commentData = {
      postId: currBlog.id,
      id: 500,
      name: "John Doe",
      email: "info@example.com",
      body: newComment,
    };

    axios
      .post(`https://jsonplaceholder.typicode.com/comments`, commentData)
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error adding comment: ", error);
      });
  };

  const deleteBlog = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${currBlog.id}`)
      .then(() => {
        setBlogs(blogs.filter((elem) => elem.id !== currBlog.id));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting post: ", error);
      });
  };

  const deleteComment = (deleteId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${deleteId}`)
      .then(() => {
        setComments(comments.filter((elem) => deleteId !== elem.id));
      });
  };

  const editComment = (comment) => {
    setEditing(comment.id);
    setEditingComment(comment.body);
  };

  const handleEditingCommentChange = (e) => {
    setEditingComment(e.target.value);
  };

  const saveEditingComment = (editedComment) => {
    axios
      .put(
        `https://jsonplaceholder.typicode.com/comments/${editedComment.id}`,
        editedComment
      )
      .then(() => {
        const updatedComments = comments.map((comment) =>
          comment.id === editedComment.id ? editedComment : comment
        );
        setComments(updatedComments);
        setEditing(null);
      })
      .catch((error) => {
        console.error("Error updating comment: ", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="blog-card ">
        <div className="name-and-button">
          <b>
            @UserId{currBlog.userId}-Blog{currBlog.id}
          </b>
          <Link id="link" to={`/blogs/${id}/edit`}>
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
          <i className="fa-solid fa-trash" onClick={deleteBlog}></i>
        </div>
        <div className="blog">
          <b>{currBlog.title}</b>
          <p>{currBlog.body}</p>
        </div>

        <div className="add-comment">
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
          />
          <button onClick={submitComment}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>

        <div className="comments">
          <ul>
            <div className="topic">
              <hr /> Comments <hr />
            </div>
            {currComments.length === 0 ? (
              <h2 style={{ textAlign: "center", color: "black" }}>
                No Comments
              </h2>
            ) : (
              currComments.map((comment, index) => (
                <li key={index}>
                  <div className="comment-header">
                    <b>@{comment.email}</b>
                    <div>
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => editComment(comment)}
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteComment(comment.id)}
                      ></i>
                    </div>
                  </div>

                  {isEditing == comment.id ? (
                    <>
                      <textarea
                        defaultValue={comment.body}
                        spellCheck="false"
                        className="comment"
                        rows={4}
                        onChange={handleEditingCommentChange}
                      ></textarea>
                      <div className="options">
                        <button
                          onClick={() =>
                            saveEditingComment({
                              ...comment,
                              body: editingComment,
                            })
                          }
                        >
                          Save
                        </button>
                        <button onClick={() => setEditing(null)}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <p style={{ padding: "5px" }}>{comment.body}</p>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
