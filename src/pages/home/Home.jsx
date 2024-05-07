import React from "react";
import { useBlogs } from "../../components/context/BlogContext";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { blogs } = useBlogs();

  return (
    <>
      <Navbar />
      <div className="home">
        {blogs.map((blog, index) => (
          <Link to={`/blog/${blog.id}`} className="card" key={index}>
            <Card blog={blog} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
