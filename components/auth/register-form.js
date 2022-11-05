import Link from "next/link";
import { TheButton } from "../UI/the-button";
import classes from "./register-form.module.css";

import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useRouter } from "next/router";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ERROR,
  SET_LOADING_STATUS,
} from "../../store/slicers/appStatusSlice";

// API HOOK
import { useApi } from "../../hooks/useApi";

// NEXT AUTH
import { signIn } from "next-auth/react";

export const RegisterForm = () => {
  const name = useRef();
  const surname = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const dispatch = useDispatch();
  const { postApi } = useApi();
  const router = useRouter();

  const handleRegister = async (event) => {
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

    if (!password !== !confirmPassword) {
      dispatch(SET_ERROR("The passwords are different!"));
      return;
    }

    const newUser = {
      name: name.current.value,
      surname: surname.current.value,
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
    };

    try {
      dispatch(SET_LOADING_STATUS(true));
      const result = await postApi("/api/user/register", newUser);
      console.log(result, "RESULT REGISTER");
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: newUser.email,
        password: newUser.password,
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
