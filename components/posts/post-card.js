import classes from "./post-card.module.css";

import Image from "next/image";
import parse from "html-react-parser";

import { TheButton } from "../UI/the-button";

import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";

export const PostCard = ({ post }) => {
  const router = useRouter();

  const navigateWithPush = (path) => {
    router.push(path);
  };

  return (
    <article className={classes["post-card"]}>
      <div className={classes["post-image-container"]}>
        <Image src={post.thumbnail} alt={post.title} width={300} height={500} />
      </div>
      <div className={classes["post-recap-container"]}>
        <h2>{post.title}</h2>
        <h4>{post.author}</h4>
        <div>{parse(post.recap)} ...</div>
      </div>
      <div className={classes["post-actions-container"]}>
        <TheButton
          funcToExecute={() => {
            navigateWithPush(`/posts/${post.slug}`);
          }}
          label={`Read ${post.title}`}
          icon={faPlane}
        />
        <TheButton
          label={`Show other post by ${post.author}`}
          severity="info"
          icon={faUserCircle}
        />
      </div>
    </article>
  );
};
