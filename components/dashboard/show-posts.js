import { PostList } from "../posts/post-list";

import { isLoadingStatus } from "../../store/slicers/appStatusSlice";
import { useSelector } from "react-redux";

import { TheBadge } from "../UI/the-badge";

export const ShowPosts = ({ posts }) => {
  const isLoading = useSelector(isLoadingStatus);

  let toBeRendered;
  if (!isLoading) {
    toBeRendered = posts.map((post) => (
      <PostList key={post._id} post={post} isDashboard={true} />
    ));
  } else {
    <TheBadge label="Fetching posts..." />;
  }

  return <div>{toBeRendered}</div>;
};
