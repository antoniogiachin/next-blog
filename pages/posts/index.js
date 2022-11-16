import { PostList } from "../../components/posts/post-list";
import { connectToDatabase } from "../../lib/db";

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

export async function getStaticProps() {
  const client = await connectToDatabase();

  const db = client.db();

  const allPosts = await db.collection("posts").find().toArray();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(allPosts)) || [],
    },
    revalidate: 60,
  };
}
