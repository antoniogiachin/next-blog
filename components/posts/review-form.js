import classes from "./review-form.module.css";
import { useRef, useState, useEffect } from "react";
import { TheButton } from "../UI/the-button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faPlaneCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { useApi } from "../../hooks/useApi";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  isLoadingStatus,
  SET_ERROR,
  SET_LOADING_STATUS,
  SET_NOTIFICATION,
} from "../../store/slicers/appStatusSlice";

export const ReviewForm = ({ handleWriteReview, postId }) => {
  const [title, setTitle] = useState("");
  const [vote, setVote] = useState(0);
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const { postApi } = useApi();
  const isLoading = useSelector(isLoadingStatus);

  const handleSendReview = async (event) => {
    event.preventDefault();

    dispatch(SET_LOADING_STATUS(true));

    if (!title || !vote || !content) {
      dispatch(SET_LOADING_STATUS(false));
      dispatch(SET_ERROR("All field are required!"));
      return;
    }

    const reviewTosave = {
      title,
      vote,
      content,
      postId,
    };

    await postApi("/api/reviews", reviewTosave);
    dispatch(
      SET_NOTIFICATION({
        show: true,
        severity: "success",
        text: "Review Successfully posted!",
      })
    );

    handleWriteReview("refetch");
  };

  const setRatingClick = (index) => {
    if (vote === index + 1) {
      setVote(index);
    } else if (vote !== index + 1) {
      setVote(index + 1);
    } else {
      setVote(1);
    }
  };

  const arrayForVote = [...Array(5)];
  let starsArrayRender = arrayForVote.map((n, index) => (
    <FontAwesomeIcon
      key={index}
      icon={index < vote ? faStar : emptyStar}
      onClick={() => {
        setRatingClick(index);
      }}
    />
  ));

  const titleRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSendReview} className={classes.form}>
      <div className={classes.top}>
        <div className={classes.control}>
          <label htmlFor="title">Title: </label>
          <input
            ref={titleRef}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
            name="title"
            id="title"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Vote: </label>
          <div>{starsArrayRender}</div>
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="content">Content: </label>
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          name="content"
          id="content"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div className={classes.actions}>
        <TheButton
          isLoading={isLoading}
          disabledProps={!title || !content}
          label="Send Review"
          icon={faPlaneCircleCheck}
        />
      </div>
    </form>
  );
};
