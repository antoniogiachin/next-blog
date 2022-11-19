import { Fragment } from "react";
import { FeaturedPosts } from "../components/home-page/featured-posts";
import { Hero } from "../components/home-page/hero";

import { connection } from "../lib/db";

export default function Home({ posts }) {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const { db, client } = await connection();

  const featuredPosts = await db
    .collection("posts")
    .find({ isFeatured: true })
    .toArray();

  await client.close();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(featuredPosts)) || [],
    },
    revalidate: 60,
  };
}
