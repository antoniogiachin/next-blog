import Link from "next/link";

import classes from "./desktop-navbar.module.css";

export const DesktopNavbar = ({ toggleDarkMode, isDark }) => {
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
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
          <li>
            <Link href="/">Logout</Link>
          </li>
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
