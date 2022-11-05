import Link from "next/link";

import classes from "./desktop-navbar.module.css";

// NEXT AUTH
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export const DesktopNavbar = ({ toggleDarkMode, isDark }) => {
  const { data: session, loading } = useSession();
  
  const handleLogout = () => {
    signOut();
  };

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
              <Link href="/">Dashboard</Link>
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
