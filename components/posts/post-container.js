import parse from "html-react-parser";
import { TheButton } from "../UI/the-button";

import classes from "./post-container.module.css";

import { useApi } from "../../hooks/useApi";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { ReviewForm } from "./review-form";
import { ReviewList } from "./review-list";

import Image from "next/image";

export const PostContainer = ({ post }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [fetchedReviews, setFetchedReview] = useState([]);

  const { getApi } = useApi();

  const handleShowReviews = async () => {
    if (!showReviews) {
      // fetch reviews
      const { reviews } = await getApi(`/api/reviews/${post._id}`);
      setFetchedReview(reviews);
    }
    setShowReviews((prevShowState) => !prevShowState);
  };

  const handleWriteReview = async (mode = "standard") => {
    if (mode === "refetch") {
      const { reviews } = await getApi(`/api/reviews/${post._id}`);
      setFetchedReview(reviews);
    }
    setShowReviewForm((prevShowReviewForm) => !prevShowReviewForm);
  };

  return (
    <article className={classes["post-container"]}>
      <div className={classes["title-container"]}>
        <Image src={post.thumbnail} alt={post.title} fill={true} />
        <div className={classes["title-overlay"]}></div>
        <h1>{post.title}</h1>
      </div>
      <div>{parse(post.content)}</div>
      <div className={classes["post-actions"]}>
        <TheButton
          funcToExecute={handleShowReviews}
          label={showReviews ? "Close Reviews" : "Show Reviews"}
          icon={showReviews ? faXmark : faPlusCircle}
          severity="success"
        />
        <TheButton
          funcToExecute={handleWriteReview}
          label={showReviewForm ? "Close Editor" : "Write Review"}
          icon={showReviewForm ? faXmark : faPen}
          severity="warning"
        />
      </div>
      {showReviewForm && (
        <div className={classes["review-form-container"]}>
          <ReviewForm handleWriteReview={handleWriteReview} postId={post._id} />
        </div>
      )}
      {showReviews && (
        <div className={classes["review-container"]}>
          <ReviewList reviews={post.reviews} fetchedReviews={fetchedReviews} />
        </div>
      )}
    </article>
  );
};
