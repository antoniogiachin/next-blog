import { unstable_getServerSession } from "next-auth";
import { DashboardSwitcher } from "../../components/dashboard/dashoboard-switcher";

// import { connectToDatabase } from "../../lib/db";
import { authOptions } from "../api/auth/[...nextauth]";

import { useApi } from "../../hooks/useApi";

import { useState, useEffect, useCallback } from "react";
import { CreatePost } from "../../components/dashboard/create-post";
import { ShowPosts } from "../../components/dashboard/show-posts";

const Dashboard = ({ name, email }) => {
  const [posts, setPosts] = useState([]);
  const [action, setAction] = useState("editProfile");

  const { getApi } = useApi();
  const handleRedirectAction = async (action) => {
    await initializer();
    setAction(action);
  };

  const initializer = useCallback(async () => {
    const { user } = await getApi("/api/user/fetch-user-infos");
    setPosts(user[0].posts);
  }, [getApi]);

  useEffect(() => {
    initializer();
  }, []);

  return (
    <section>
      <DashboardSwitcher action={action} setAction={setAction} />
      {action === "editProfile" && <p>Profile</p>}
      {action === "writePost" && (
        <CreatePost handleRedirectAction={handleRedirectAction} />
      )}
      {action === "seePosts" && <ShowPosts posts={posts} />}
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

  return {
    props: {
      name: user.name,
      email: user.email,
    },
  };
}

export default Dashboard;
