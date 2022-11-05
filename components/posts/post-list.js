import classes from "./post-list.module.css";

import { TheButton } from "../UI/the-button";

import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export const PostList = ({ post }) => {
  return (
    <article className={classes["list-post-container"]}>
      <h2>{post.title}</h2>
      <h3>Written by {post.author}</h3>
      <p>{post.recap} ...</p>
      <div className={classes["list-post-actions"]}>
        <TheButton
          label={`Show other post by ${post.author}`}
          severity="info"
          icon={faUserCircle}
        />
        <TheButton label={`Read ${post.title}`} icon={faPlane} />
      </div>
    </article>
  );
};
