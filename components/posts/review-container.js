import classes from "./review-container.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptystar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useReactionSaveAndLimit } from "../../hooks/useReactionSaveAndLimit";

export const ReviewContainer = ({ review, reviewFetcher }) => {
  const {
    whichIsLoading,
    upCounter,
    downCounter,
    heCounter,
    handleReactionSubmit,
  } = useReactionSaveAndLimit(review, reviewFetcher);

  console.log(upCounter, downCounter);

  let voteRendered = [...Array(5)].map((number, index) => (
    <FontAwesomeIcon
      key={index}
      icon={index < review.vote ? faStar : emptystar}
      className={index < review.vote ? classes["star"] : ""}
    />
  ));

  const handleSubmit = async (reaction) => {
    await handleReactionSubmit(reaction);
  };

  return (
    <article className={classes["review-container"]}>
      <div className={classes["recap"]}>
        <p>{review.title}</p>
        <p>{review.content}</p>
      </div>
      <div className={classes["vote"]}>
        <span>{voteRendered}</span>
        <div className={classes["reaction-container"]}>
          <div
            onClick={() => {
              handleSubmit("thumbUp");
            }}
            className={`${classes["reaction"]} ${
              classes[upCounter === 0 ? "reaction-av" : "reaction-dis"]
            }`}
          >
            {whichIsLoading === "thumbUp" && (
              <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
            )}
            {whichIsLoading !== "thumbUp" && (
              <FontAwesomeIcon icon={faThumbsUp} />
            )}
            <span>{review.reactions.thumbUp}</span>
          </div>
          <div
            onClick={() => {
              handleSubmit("thumbsDown");
            }}
            className={`${classes["reaction"]} ${
              classes[downCounter === 0 ? "reaction-av" : "reaction-dis"]
            }`}
          >
            {whichIsLoading === "thumbsDown" && (
              <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
            )}
            {whichIsLoading !== "thumbsDown" && (
              <FontAwesomeIcon icon={faThumbsDown} />
            )}
            <span>{review.reactions.thumbsDown}</span>
          </div>
          <div
            onClick={() => {
              handleSubmit("heart");
            }}
            className={`${classes["reaction"]} ${
              classes[heCounter === 0 ? "reaction-av" : "reaction-dis"]
            }`}
          >
            {whichIsLoading === "heart" && (
              <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
            )}
            {whichIsLoading !== "thumbsDown" && (
              <FontAwesomeIcon icon={faHeart} />
            )}
            <span>{review.reactions.heart}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
