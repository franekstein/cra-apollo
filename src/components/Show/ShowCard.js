import React from "react";
import cn from "classnames";

import "./style.css";

export const ShowCard = ({ className, show }) => {
  return (
    <div className={cn("card", className)}>
      <div className="card-img-holder">
        <img className="card-img-top" src={show.image.medium} alt={show.name} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{show.name}</h5>
        <p
          className="card-text"
          dangerouslySetInnerHTML={{ __html: show.summary }}
        />
      </div>
    </div>
  );
};
