import React from "react";
import classes from "./review-container.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptystar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export const ReviewContainer = ({ review }) => {
  let voteRendered = [...Array(5)].map((number, index) => (
    <FontAwesomeIcon
      key={index}
      icon={index < review.vote ? faStar : emptystar}
      className={index < review.vote ? classes["star"] : ""}
    />
  ));

  return (
    <article className={classes["review-container"]}>
      <div className={classes["recap"]}>
        <p>{review.title}</p>
        <p>{review.content}</p>
      </div>
      <div className={classes["vote"]}>
        <span>{voteRendered}</span>
        <div className={classes["reaction-container"]}>
          <div className={classes["reaction"]}>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{review.reactions.thumbUp}</span>
          </div>
          <div className={classes["reaction"]}>
            <FontAwesomeIcon icon={faThumbsDown} />
            <span>{review.reactions.thumbsDown}</span>
          </div>
          <div className={classes["reaction"]}>
            <FontAwesomeIcon icon={faHeart} />
            <span>{review.reactions.heart}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
