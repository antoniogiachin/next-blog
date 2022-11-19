import { PostContainer } from "../../components/posts/post-container";

import { connection } from "../../lib/db";

const SinglePostPage = ({ post }) => {
  return (
    <section>
      <PostContainer post={post} />
    </section>
  );
};

export async function getStaticProps(context) {
  const postSlug = context.params.slug;

  const { db, client } = await connection();

  const agg = [
    {
      $lookup: {
        from: "reviews",
        localField: "ObjectID",
        foreignField: "ObjectID",
        as: "reviews",
      },
    },
    {
      $match: {
        slug: postSlug,
      },
    },
  ];

  const collection = db.collection("posts");
  const cursor = collection.aggregate(agg);
  const post = await cursor.toArray();

  await client.close();

  return {
    props: { post: JSON.parse(JSON.stringify(post[0])) },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const { db, client } = await connection();

  const posts = await db
    .collection("posts")
    .find()
    .project({ slug: 1 })
    .toArray();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  await client.close();

  return {
    paths: paths,
    fallback: true,
  };
}

export default SinglePostPage;
