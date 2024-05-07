import React from "react";
import "./Card.css";

const Card = ({ blog }) => {
  return (
    <>
      <div className="cardContainer">
        <h4>{blog.title}</h4>
        <p>{blog.body}</p>
      </div>
    </>
  );
};

export default Card;
