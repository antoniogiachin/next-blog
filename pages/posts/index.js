import { PostList } from "../../components/posts/post-list";
import { connection } from "../../lib/db";

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
  const { db, client } = await connection();

  const allPosts = await db.collection("posts").find().toArray();

  await client.close();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(allPosts)) || [],
    },
    revalidate: 60,
  };
}
