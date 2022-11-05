import { Fragment, useEffect } from "react";
import { TheNavbar } from "../UI/the-navbar";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_THEME, themeDarkStatus } from "../../store/slicers/themeSlice";
import { errorStatus, SET_ERROR } from "../../store/slicers/appStatusSlice";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isDark = useSelector(themeDarkStatus);
  const error = useSelector(errorStatus);

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("theme"));
    if (storedTheme) {
      const { isDarkSettled } = storedTheme;
      if (isDarkSettled || (!isDarkSettled && isDark)) {
        document.body.setAttribute("data-theme", "dark");
        dispatch(CHANGE_THEME(true));
      } else if (!isDarkSettled && !isDark) {
        document.body.setAttribute("data-theme", "light");
        dispatch(CHANGE_THEME(false));
      }
    } else {
      document.body.setAttribute("data-theme", "light");
      dispatch(CHANGE_THEME(false));
    }
  }, [isDark, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(SET_ERROR(null));
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error, dispatch]);

  return (
    <Fragment>
      <TheNavbar />
      <main>{children}</main>
    </Fragment>
  );
};
