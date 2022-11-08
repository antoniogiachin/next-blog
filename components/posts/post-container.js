import parse from "html-react-parser";
import { TheButton } from "../UI/the-button";

import classes from "./post-container.module.css";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export const PostContainer = ({ post }) => {
  console.log(post);
  return (
    <article className={classes["post-container"]}>
      <div className={classes["title-container"]}>
        <img src="https://picsum.photos/200/300" alt="dummy" />
        <div className={classes["title-overlay"]}></div>
        <h1>{post.title}</h1>
      </div>
      <div>{parse(post.content)}</div>
      <div className={classes["post-actions"]}>
        <TheButton
          label="Show Reviews"
          icon={faPlusCircle}
          severity="success"
        />
        <TheButton label="Write Rewiew" icon={faPen} severity="warning" />
      </div>
    </article>
  );
};
