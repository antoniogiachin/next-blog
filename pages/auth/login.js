import { LoginForm } from "../../components/auth/login-form";

import classes from "./login.module.css";

// NEXT AUTH
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const Login = (props) => {
  return (
    <section className={classes.login}>
      <div className={classes.container}>
        <h1 className="heading">Login</h1>
        <LoginForm />
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      props: { session },
      redirect: { destination: "/dashboard", permanent: false },
    };
  }

  return { props: {} };
}

export default Login;
