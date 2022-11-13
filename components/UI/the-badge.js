import { useMemo } from "react";

import classes from "./the-badge.module.css";

export const TheBadge = ({ label, severity }) => {
  const renderStyle = useMemo(() => {
    switch (severity) {
      case "danger":
        return "badge-danger";
      case "info":
        return "badge-info";
      case "success":
        return "badge-success";
      default:
        return "badge-secondary";
    }
  }, [severity]);

  return (
    <div className={`${classes["badge"]} ${classes[renderStyle]}`}>
      <span>{label}</span>
    </div>
  );
};
