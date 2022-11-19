import { TheBadge } from "../UI/the-badge";
import { ReviewContainer } from "./review-container";
import { useMemo } from "react";

import classes from "./review-list.module.css";

export const ReviewList = ({ reviews, fetchedReviews }) => {
  const reviewsToMap = useMemo(() => {
    const merged = [...reviews, ...fetchedReviews];
    let filtered = [];
    for (const rev of merged) {
      if (!filtered.find((r) => r._id === rev._id)) {
        filtered.push(rev);
      }
    }
    return filtered;
  }, [reviews, fetchedReviews]);

  let toBeRendered;
  if (!reviews.length || !reviews) {
    toBeRendered = <TheBadge label="No reviews..." />;
  } else {
    toBeRendered = reviewsToMap.map((review) => (
      <div className={classes["container-wrapper"]} key={review._id}>
        <ReviewContainer review={review} />
      </div>
    ));
  }

  return <div>{toBeRendered}</div>;
};
