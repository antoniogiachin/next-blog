import { Fragment, useEffect } from "react";
import { TheNavbar } from "../UI/the-navbar";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_THEME, themeDarkStatus } from "../../store/slicers/themeSlice";
import {
  errorStatus,
  isGlobalLoadingStatus,
  notificationSeverityStatus,
  notificationTextStatus,
  RESET_NOTIFICATION,
  SET_ERROR,
  SET_NOTIFICATION,
  showNotificationStatus,
} from "../../store/slicers/appStatusSlice";
import { NotificationBadge } from "../UI/notification-badge";
import { AppLoading } from "../UI/app-loading";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isDark = useSelector(themeDarkStatus);
  const isGlobalLoading = useSelector(isGlobalLoadingStatus);
  const error = useSelector(errorStatus);
  const showNotification = useSelector(showNotificationStatus);
  const severityNotification = useSelector(notificationSeverityStatus);
  const textNotification = useSelector(notificationTextStatus);

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
    if (error) {
      dispatch(
        SET_NOTIFICATION({
          show: true,
          severity: "danger",
          text: error || "Something went Wrong!",
        })
      );

      const timer = setTimeout(() => {
        dispatch(SET_ERROR(null));
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        dispatch(RESET_NOTIFICATION());
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showNotification, dispatch]);

  return (
    <Fragment>
      <TheNavbar />
      <main>{children}</main>
      {showNotification && (
        <NotificationBadge
          severity={severityNotification}
          text={textNotification}
        />
      )}
      {isGlobalLoading && <AppLoading />}
    </Fragment>
  );
};
