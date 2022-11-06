import { LoginForm } from "../../components/auth/login-form";

import classes from "./login.module.css";

// NEXT AUTH
import { getSession } from "next-auth/react";

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
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      props: { session },
      redirect: { destination: "/", permanent: false },
    };
  }

  return { props: {} };
}

export default Login;
