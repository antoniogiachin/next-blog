import Link from "next/link";
import { TheButton } from "../UI/the-button";
import classes from "./register-form.module.css";

import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

// REDUX
import {
  SET_LOADING_STATUS,
  SET_ERROR,
} from "../../store/slicers/appStatusSlice";
import { useDispatch, useSelector } from "react-redux";

export const RegisterForm = () => {
  const name = useRef();
  const surname = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const dispatch = useDispatch();

  const handleRegister = async (event) => {
    event.preventDefault();

    const EMAIL_REGEX =
      /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    const PWD_REGEX = /[0-9a-zA-Z]{6,}/;

    if (!EMAIL_REGEX.test(email.current.value)) {
      alert("invalid email");
      return;
    }

    if (!PWD_REGEX.test(password.current.value)) {
      alert("invalid password");
      return;
    }

    if (!password !== !confirmPassword) {
      alert("invalid password");
      return;
    }
  };

  return (
    <form onSubmit={handleRegister} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="name">Name: </label>
        <input ref={name} type="text" name="name" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="surname">Surname: </label>
        <input ref={surname} type="text" name="surname" id="surname" />
      </div>
      <div className={classes.control}>
        <label htmlFor="email">Email: </label>
        <input ref={email} type="email" name="email" id="email" />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Password: </label>
        <input ref={password} type="password" name="password" id="password" />
      </div>
      <div className={classes.control}>
        <label htmlFor="confirm-password">Confirm Password: </label>
        <input
          ref={confirmPassword}
          type="password"
          name="confirm-password"
          id="confirm-password"
        />
      </div>
      <div className={classes.actions}>
        <Link href="/auth/login">Already registered?</Link>
        <TheButton label="Register" icon={faUserLock} />
      </div>
    </form>
  );
};
