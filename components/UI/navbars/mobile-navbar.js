import Link from "next/link";
import { useEffect, useState } from "react";

// FONT AWASOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import classes from "./mobile-navbar.module.css";

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

export const MobileNavbar = ({ toggleDarkMode, isDark }) => {
  const [showSidebar, setShowSidebar] = useState();

  const { data: session, loading } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const isGlobalLoading = useSelector(isGlobalLoadingStatus);

  const handleSidebarShow = (mode = "simple") => {
    if (mode !== "simple" && showSidebar === "show") {
      setShowSidebar("hide");
      if (mode === "logout") {
        dispatch(SET_GLOBAL_LOADING_STATUS(true));
        signOut();
        router.replace("/login");
      }
      return;
    } else if (mode !== "simple" && !showSidebar) {
      return;
    }

    if (showSidebar && showSidebar === "show") {
      setShowSidebar("hide");
    } else if ((showSidebar && showSidebar === "hide") || !showSidebar) {
      setShowSidebar("show");
    }
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
      <div className={classes.icons}>
        <FontAwesomeIcon
          onClick={() => {
            handleSidebarShow();
          }}
          className={`'fa-3x' ${classes.awesome}`}
          icon={faBars}
        />
        <h1>
          <Link
            onClick={() => {
              handleSidebarShow("heading");
            }}
            href="/"
          >
            TTB!
          </Link>
        </h1>
      </div>
      {/* {showSidebar && ( */}
      <nav
        className={`${classes.navbar} ${
          showSidebar === "show"
            ? classes.show
            : showSidebar === "hide" && classes.hide
        }`}
      >
        <ul>
          <li>
            <Link
              onClick={() => {
                handleSidebarShow();
              }}
              href="/posts"
            >
              Posts
            </Link>
          </li>
          {session && (
            <li>
              <Link
                onClick={() => {
                  handleSidebarShow();
                }}
                href="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
          {!session && (
            <li>
              <Link
                onClick={() => {
                  handleSidebarShow();
                }}
                href="/auth/login"
              >
                Login
              </Link>
            </li>
          )}
          {session && (
            <li>
              <span
                onClick={() => {
                  handleSidebarShow("logout");
                }}
              >
                Logout
              </span>
            </li>
          )}
          <li>
            <div
              onClick={toggleDarkMode}
              className={`${classes.toggler} ${
                isDark ? classes.dark : classes.light
              }`}
            >
              <div className={classes.button}></div>
            </div>
          </li>
        </ul>
      </nav>
      {/* )} */}
    </header>
  );
};
