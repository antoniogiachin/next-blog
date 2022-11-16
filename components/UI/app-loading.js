import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import classes from "./app-loading.module.css";

export const AppLoading = () => {
  return (
    <div className={classes["app-loading"]}>
      <div className={classes["app-loading-content"]}>
        <h1>Your favourite Blog Site is working for you!...</h1>
        <FontAwesomeIcon className="fa-9x fa-spin" icon={faSpinner} />
      </div>
    </div>
  );
};
