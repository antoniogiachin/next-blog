import Link from "next/link";
import { useRef } from "react";
import { TheButton } from "../UI/the-button";
import classes from "./login-form.module.css";

import { faUnlock } from "@fortawesome/free-solid-svg-icons";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ERROR,
  SET_LOADING_STATUS,
} from "../../store/slicers/appStatusSlice";

// NEXT AUTH
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const email = useRef();
  const password = useRef();

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const EMAIL_REGEX =
      /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    const PWD_REGEX = /[0-9a-zA-Z]{6,}/;

    if (!EMAIL_REGEX.test(email.current.value)) {
      dispatch(SET_ERROR("Please Provide a valid email address!"));
      return;
    }

    if (!PWD_REGEX.test(password.current.value)) {
      dispatch(
        SET_ERROR("Please Provide a valid password (min 6 char length)")
      );
      return;
    }

    try {
      dispatch(SET_LOADING_STATUS(true));
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: email.current.value,
        password: password.current.value,
      });

      if (loginResult.error) {
        dispatch(SET_LOADING_STATUS(false));
        dispatch(SET_ERROR(loginResult.error));
      } else {
        dispatch(SET_LOADING_STATUS(false));
        router.replace("/");
      }
    } catch (err) {
      dispatch(SET_LOADING_STATUS(false));
      dispatch(SET_ERROR(err));
    }
  };

  return (
    <form onSubmit={handleLogin} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="email">Email: </label>
        <input ref={email} type="email" name="email" id="email" />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Password: </label>
        <input ref={password} type="password" name="password" id="password" />
      </div>
      <div className={classes.actions}>
        <Link href="/auth/register">Not registered yet?</Link>
        <TheButton label="login" icon={faUnlock} />
      </div>
    </form>
  );
};
