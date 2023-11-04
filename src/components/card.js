import React from "react";
import "./card.css";
import Share from "../icons/share";

const Card = ({ firstname, surname, motivation, category, year, share }) => {
  return (
    <div className="card-container">
      <div className="card-body">
        <h2>
          {firstname} {surname}
        </h2>
        <p>{motivation}</p>
      </div>
      <div className="card-footer">
        <div className="tag-wrap">
          <p className="tag">{category}</p>
          <p className="tag">{year}</p>
        </div>

        <div className="share-container">
          <Share />
          <p>{share}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
