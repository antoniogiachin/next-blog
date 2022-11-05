import classes from "./post-card.module.css";

import Image from "next/image";

import { TheButton } from "../UI/the-button";

import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export const PostCard = ({ post }) => {
  return (
    <article className={classes["post-card"]}>
      <div className={classes["post-image-container"]}>
        {/* <Image src={'post.image'} alt={post.slug} width={300} height={300} /> */}
        <img src="https://picsum.photos/200/300" alt="dummy" />
      </div>
      <div className={classes["post-recap-container"]}>
        <h2>{post.title}</h2>
        <h4>{post.author}</h4>
        <p>{post.recap}</p>
      </div>
      <div className={classes["post-actions-container"]}>
        <TheButton label={`Read ${post.title}`} icon={faPlane} />
        <TheButton
          label={`Show other post by ${post.author}`}
          severity="info"
          icon={faUserCircle}
        />
      </div>
    </article>
  );
};
