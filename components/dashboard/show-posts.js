import { PostList } from "../posts/post-list";

export const ShowPosts = ({ posts }) => {
  const toBeRendered = posts.map((post) => (
    <PostList key={post._id} post={post} isDashboard={true} />
  ));
  return <div>{toBeRendered}</div>;
};
