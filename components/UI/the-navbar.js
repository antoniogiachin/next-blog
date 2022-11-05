// NEXT
import { Fragment } from "react";

// REDUX THEME
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_THEME, themeDarkStatus } from "../../store/slicers/themeSlice";
import { DesktopNavbar } from "./navbars/desktop-navbar";
import { MobileNavbar } from "./navbars/mobile-navbar";

export const TheNavbar = () => {
  const dispatch = useDispatch();
  const isDark = useSelector(themeDarkStatus);

  const toggleDarkMode = () => {
    dispatch(CHANGE_THEME(!isDark));
  };

  return (
    <Fragment>
      <DesktopNavbar toggleDarkMode={toggleDarkMode} isDark={isDark} />
      <MobileNavbar toggleDarkMode={toggleDarkMode} isDark={isDark} />
    </Fragment>
  );
};
