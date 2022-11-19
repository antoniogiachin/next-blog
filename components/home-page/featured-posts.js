import { PostCard } from "../posts/post-card";

import classes from "./featured-posts.module.css";

export const FeaturedPosts = ({ posts }) => {
  const toBeRendered = posts.map((post, index) => (
    <PostCard key={index} post={post} />
  ));

  return (
    <section className={classes["posts-card-container"]}>
      {toBeRendered}
    </section>
  );
};
