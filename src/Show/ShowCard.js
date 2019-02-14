import React from "react";
import cn from "classnames";

import "./style.css";

export const ShowCard = ({ className, show }) => {
  return (
    <div className={cn("card", className)}>
      <img src={show.image.medium} className="card-img-top" alt={show.name} />
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
