import { PostContainer } from "../../components/posts/post-container";

import { connectToDatabase } from "../../lib/db";

const SinglePostPage = ({ post }) => {
  return (
    <section>
      <PostContainer post={post} />
    </section>
  );
};

export async function getStaticProps(context) {
  const postSlug = context.params.slug;

  const client = await connectToDatabase();

  const db = client.db();

  const post = await db.collection("posts").findOne({ slug: postSlug });

  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const client = await connectToDatabase();

  const db = client.db();

  const posts = await db.collection("posts").find().toArray();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export default SinglePostPage;
