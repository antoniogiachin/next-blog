import { TheBadge } from "../UI/the-badge";
import { ReviewContainer } from "./review-container";

import classes from "./review-list.module.css";

export const ReviewList = ({ reviews, reviewFetcher }) => {
  let toBeRendered;
  if (!reviews.length || !reviews) {
    toBeRendered = <TheBadge label="No reviews..." />;
  } else {
    toBeRendered = reviews.map((review) => (
      <div className={classes["container-wrapper"]} key={review._id}>
        <ReviewContainer reviewFetcher={reviewFetcher} review={review} />
      </div>
    ));
  }

  return <div>{toBeRendered}</div>;
};
