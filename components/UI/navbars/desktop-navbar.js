import Link from "next/link";

import classes from "./desktop-navbar.module.css";

// NEXT
import { useRouter } from "next/router";

// REDUX
import { useDispatch, useSelector } from "react-redux";

// NEXT AUTH
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  isGlobalLoadingStatus,
  SET_GLOBAL_LOADING_STATUS,
} from "../../../store/slicers/appStatusSlice";
import { useEffect } from "react";

export const DesktopNavbar = ({ toggleDarkMode, isDark }) => {
  const { data: session, loading } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const isGlobalLoading = useSelector(isGlobalLoadingStatus);

  const handleLogout = () => {
    dispatch(SET_GLOBAL_LOADING_STATUS(true));
    signOut();
    router.replace("/login");
  };

  useEffect(() => {
    if (isGlobalLoading) {
      const timer = setTimeout(() => {
        dispatch(SET_GLOBAL_LOADING_STATUS(false));
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isGlobalLoading, dispatch]);

  return (
    <header className={classes.header}>
      <h1>
        <Link href="/">The Tony Blog!</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          {session && (
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}
          {!session && (
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <span onClick={handleLogout}>Logout</span>
            </li>
          )}
        </ul>
      </nav>
      <nav>
        <div
          onClick={toggleDarkMode}
          className={`${classes.toggler} ${
            isDark ? classes.dark : classes.light
          }`}
        >
          <div className={classes.button}></div>
        </div>
      </nav>
    </header>
  );
};
