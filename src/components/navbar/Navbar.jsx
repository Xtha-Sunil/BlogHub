import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";

const Navbar = () => {
  const { blogs } = useBlogs();
  const [searchList, setSearchList] = useState([]);

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredBlogs = blogs.filter((elem) => {
      if (searchTerm.startsWith("post:")) {
        const searchId = e.target.value.slice(5);
        return elem.id == searchId;
      }
      if (searchTerm.trim().length != 0)
        return elem.title.toLowerCase().startsWith(searchTerm);
    });

    setSearchList(filteredBlogs.slice(0, 10));
  };

  return (
    <>
      <nav className="sticky">
        <div className="container">
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="first-part">Blog</span>
              <span className="last-part">Hub</span>
            </Link>
          </div>
          {location.pathname == "/" && (
            <>
              <Link to="/addblog" className="logo-link">
                Add Blog
              </Link>

              <input
                type="text"
                placeholder="post:1"
                name="find"
                onChange={handleChange}
              />
            </>
          )}
        </div>
      </nav>

      {searchList.length != 0 && (
        <div className="search-result sticky">
          <ul>
            {searchList.map((item) => (
              <li key={item.id}>
                <Link to={`/blog/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
