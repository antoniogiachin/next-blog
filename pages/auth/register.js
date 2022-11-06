import { RegisterForm } from "../../components/auth/register-form";

import classes from "./register.module.css";

// REDUX AUTH
import { getSession } from "next-auth/react";

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
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      props: { session },
      redirect: { destination: "/", permanent: false },
    };
  }

  return { props: {} };
}

export default Register;
