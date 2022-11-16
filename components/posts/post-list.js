import classes from "./post-list.module.css";

import parse from "html-react-parser";

import { TheButton } from "../UI/the-button";

import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";

export const PostList = ({ post, isDashboard }) => {
  const router = useRouter();

  const navigateWithPush = (path) => {
    router.push(path);
  };

  return (
    <article className={classes["list-post-container"]}>
      <h2>{post.title}</h2>
      <h3>Written by {post.author}</h3>
      <div>{parse(post.recap)} ...</div>
      <div className={classes["list-post-actions"]}>
        {!isDashboard && (
          <TheButton
            label={`Show other post by ${post.author}`}
            severity="info"
            icon={faUserCircle}
          />
        )}
        <TheButton
          funcToExecute={() => {
            navigateWithPush(`/posts/${post.slug}`);
          }}
          label={`Read ${post.title}`}
          icon={faPlane}
        />
      </div>
    </article>
  );
};

PostList.defaultProps = {
  isDashboard: false,
};
