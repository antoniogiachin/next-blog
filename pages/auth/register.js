import { RegisterForm } from "../../components/auth/register-form";

import classes from "./register.module.css";

// REDUX AUTH
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const Register = () => {
  return (
    <section className={classes.register}>
      <div className={classes.container}>
        <h1 className="heading">Register</h1>
        <RegisterForm />
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

export default Register;
