import classes from "./notification-badge.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import { useMemo } from "react";

// REDUX
import { useDispatch } from "react-redux";
import { RESET_NOTIFICATION } from "../../store/slicers/appStatusSlice";

export const NotificationBadge = ({ severity, text }) => {
  const dispatch = useDispatch();

  const handleCloseNotification = () => {
    dispatch(RESET_NOTIFICATION);
  };

  const renderRules = useMemo(() => {
    let renderVariables;
    switch (severity) {
      case "warning":
        renderVariables = {
          class: "notification-warning",
          severityType: "Oops!",
          icon: faTriangleExclamation,
          fallbackText: "Something require your attention!",
        };
        break;
      case "success":
        renderVariables = {
          class: "notification-success",
          severityType: "Success!",
          icon: faCircleCheck,
          fallbackText: "Operation successfully completed!",
        };
        break;
      default:
        renderVariables = {
          class: "notification-danger",
          severityType: "Error!",
          icon: faBug,
          fallbackText: "Something went wrong!",
        };
        break;
    }

    return renderVariables;
  }, [severity]);

  let textToBeRendered;
  if (text || typeof text === "string") {
    textToBeRendered = text;
  } else {
    textToBeRendered = renderRules.fallbackText;
  }

  return (
    <div
      className={`${classes["notification-badge"]} ${
        classes[renderRules.class]
      }`}
    >
      <div className={classes["notification-badge-actions"]}>
        <div className={classes["notification-badge-actions_desc"]}>
          <FontAwesomeIcon className="fa-2x" icon={renderRules.icon} />
          <span>{renderRules.severityType}</span>
        </div>
        <FontAwesomeIcon
          onClick={handleCloseNotification}
          className={`fa-2x ${classes["notification-close-button"]}`}
          icon={faXmark}
        />
      </div>
      <p>{textToBeRendered}</p>
    </div>
  );
};
