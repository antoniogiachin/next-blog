import { PostContainer } from "../../components/posts/post-container";
import {
  getAllFeaturedPosts,
  getPostBySlug,
} from "../../lib/dummies/dummy-posts";

const SinglePostPage = ({ post }) => {
  return (
    <section>
      <PostContainer post={post} />
    </section>
  );
};

export async function getStaticProps(context) {
  const postSlug = context.params.slug;

  const post = getPostBySlug(postSlug);

  return {
    props: { post },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const posts = getAllFeaturedPosts();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export default SinglePostPage;
