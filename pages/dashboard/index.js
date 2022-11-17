import { unstable_getServerSession } from "next-auth";
import { DashboardSwitcher } from "../../components/dashboard/dashoboard-switcher";

import { connectToDatabase } from "../../lib/db";
import { authOptions } from "../api/auth/[...nextauth]";

import { useApi } from "../../hooks/useApi";

import { useState } from "react";
import { CreatePost } from "../../components/dashboard/create-post";
import { ShowPosts } from "../../components/dashboard/show-posts";

const Dashboard = ({ name, surname, email, posts }) => {
  const parsedPosts = JSON.parse(posts);
  const [action, setAction] = useState("editProfile");
  const [refetched, setRefetched] = useState([]);

  const { getApi } = useApi();

  const handleRedirectAction = async (
    action,
    shouldRefetch = false,
    options = {}
  ) => {
    let urlString = "/api/posts?author=" + name + "%20" + surname;
    if (options.query) {
      urlString += "&title" + "=" + options.query.replaceAll(" ", "-");
    }
    const { posts } = await getApi(urlString);
    setRefetched(posts);
    setAction(action);
  };

  return (
    <section>
      <DashboardSwitcher action={action} setAction={setAction} />
      {action === "editProfile" && <p>Profile</p>}
      {action === "writePost" && (
        <CreatePost handleRedirectAction={handleRedirectAction} />
      )}
      {action === "seePosts" && (
        <ShowPosts posts={parsedPosts} refetched={refetched} />
      )}
    </section>
  );
};

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  delete session.user.image;
  const { user } = session;

  const client = await connectToDatabase();

  const db = client.db();

  const findUser = await db.collection("users").findOne({ email: user.email });

  let usersPosts = [];
  if (findUser.posts.length) {
    for (const id of findUser.posts) {
      const res = await db.collection("posts").findOne({ _id: id });
      if (res) {
        usersPosts.push(res);
      }
    }
  }

  if (!findUser) {
    client.close();
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  client.close();
  const { name, surname, email } = findUser;

  return {
    props: { name, surname, email, posts: JSON.stringify(usersPosts) },
  };
}

export default Dashboard;
