import { Fragment } from "react";
import { FeaturedPosts } from "../components/home-page/featured-posts";
import { Hero } from "../components/home-page/hero";

import { connectToDatabase } from "../lib/db";

export default function Home({ posts }) {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await connectToDatabase();

  const db = client.db();

  const featuredPosts = await db
    .collection("posts")
    .find({ isFeatured: true })
    .toArray();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(featuredPosts)) || [],
    },
    revalidate: 60,
  };
}
