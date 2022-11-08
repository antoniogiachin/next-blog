import React from "react";

import classes from "./toggler.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export const Toggler = ({ toggleDarkMode, isDark }) => {
  return (
    <div
      onClick={toggleDarkMode}
      className={`${classes.toggler} ${isDark ? classes.dark : classes.light}`}
    >
      <div className={classes.button}>
        <FontAwesomeIcon icon={isDark ? faMoon : faSun} />
      </div>
    </div>
  );
};
