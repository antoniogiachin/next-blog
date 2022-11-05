import { PostList } from "../../components/posts/post-list";
import { getAllPosts } from "../../lib/dummies/dummy-posts";

export default function Posts({ posts }) {
  const toBeRendered = posts.map((post) => (
    <PostList key={post.id} post={post} />
  ));

  return (
    <section>
      <h1 className="heading">Start Discovering Posts</h1>
      {/* filters */}
      {/* post list  */}
      {toBeRendered}
    </section>
  );
}

export async function getServerSideProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts || [],
    },
  };
}
