import React, { useState } from "react";
import { useBlogs } from "../../components/context/BlogContext";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { blogs } = useBlogs();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(11);

  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <div className="home">
        {currentBlogs.map((blog, index) => (
          <Link to={`/blog/${blog.id}`} className="card" key={index}>
            <Card blog={blog} />
          </Link>
        ))}
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(blogs.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default Home;
