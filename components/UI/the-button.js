import { useMemo } from "react";

import classes from "./the.button.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const TheButton = ({
  severity,
  icon,
  label,
  isLoading,
  funcToExecute,
  disabledProps,
}) => {
  const renderStyle = useMemo(() => {
    switch (severity) {
      case "danger":
        return "button-danger";
      case "info":
        return "button-info";
      case "success":
        return "button-success";
      default:
        return "button-secondary";
    }
  }, [severity]);

  return (
    <button
      role="button"
      className={`${classes["button"]} ${classes[renderStyle]}`}
      type={funcToExecute ? "button" : "submit"}
      disabled={isLoading === true || disabledProps}
      onClick={funcToExecute}
    >
      {isLoading && <FontAwesomeIcon className="fa-spin" icon={faSpinner} />}
      {!isLoading && <FontAwesomeIcon icon={icon} />}
      <span>{label}</span>
    </button>
  );
};

TheButton.defaultProps = {
  label: "Please provide a label",
  icon: faSpinner,
};
