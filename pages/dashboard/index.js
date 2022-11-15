import { unstable_getServerSession } from "next-auth";
import { Fragment } from "react";
import { connectToDatabase } from "../../lib/db";
import { authOptions } from "../api/auth/[...nextauth]";

const Dashboard = ({ name, surname, email }) => {
  console.log(name, surname, email);

  return <Fragment></Fragment>;
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
    props: { name, surname, email },
  };
}

export default Dashboard;
