import { RegisterForm } from "../../components/auth/register-form";

import classes from "./register.module.css";

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

export default Register;
