import { PostList } from "../posts/post-list";

export const ShowPosts = ({ posts, refetched }) => {
  const toBeRendered = [...posts, ...refetched].map((post) => (
    <PostList key={post._id} post={post} isDashboard={true} />
  ));
  return <div>{toBeRendered}</div>;
};
