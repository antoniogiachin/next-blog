import { LoginForm } from "../../components/auth/login-form";

import classes from "./login.module.css";

const Login = () => {
  return (
    <section className={classes.login}>
      <div className={classes.container}>
        <h1 className="heading">Login</h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
