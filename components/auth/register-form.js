import Link from "next/link";
import { TheButton } from "../UI/the-button";
import classes from "./register-form.module.css";

import { faUserLock } from "@fortawesome/free-solid-svg-icons";

export const RegisterForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="surname">Surname: </label>
        <input type="text" name="surname" id="surname" />
      </div>
      <div className={classes.control}>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
      </div>
      <div className={classes.control}>
        <label htmlFor="confirm-password">Confirm Password: </label>
        <input type="password" name="confirm-password" id="confirm-password" />
      </div>
      <div className={classes.actions}>
        <Link href="/auth/login">Already registered?</Link>
        <TheButton label="Register" icon={faUserLock} />
      </div>
    </form>
  );
};
