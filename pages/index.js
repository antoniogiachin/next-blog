import { Fragment } from "react";
import { FeaturedPosts } from "../components/home-page/featured-posts";
import { Hero } from "../components/home-page/hero";

import { getAllFeaturedPosts } from "../lib/dummies/dummy-posts";

export default function Home({ posts }) {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredPosts = getAllFeaturedPosts();
  return {
    props: {
      posts: featuredPosts || [],
    },
    revalidate: 1000,
  };
}
