import { TheBadge } from "../UI/the-badge";
import { ReviewContainer } from "./review-container";

import classes from './review-list.module.css'

export const ReviewList = ({ reviews }) => {
  let toBeRendered;
  if (!reviews.length || !reviews) {
    toBeRendered = <TheBadge label="No reviews..." />;
  } else {
    toBeRendered = reviews.map((review) => (
      <div className={classes['container-wrapper']} key={review.id}>
        <ReviewContainer review={review} />
      </div>
    ));
  }

  return <div>{toBeRendered}</div>;
};
