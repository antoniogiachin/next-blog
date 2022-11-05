import Link from "next/link";
import { TheButton } from "../UI/the-button";
import classes from "./login-form.module.css";

import { faUnlock } from "@fortawesome/free-solid-svg-icons";

export const LoginForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
      </div>
      <div className={classes.actions}>
        <Link href="/auth/register">Not registered yet?</Link>
        <TheButton label="login" icon={faUnlock} />
      </div>
    </form>
  );
};
