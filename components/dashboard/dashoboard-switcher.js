import classes from "./dashboard-switcher.module.css";

import { TheButton } from "../UI/the-button";

import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";

export const DashboardSwitcher = ({ action, setAction }) => {
  return (
    <div className={classes["dashboard-switcher-container"]}>
      <TheButton
        icon={faUserCircle}
        label={
          action === "editProfile"
            ? "Editing your profile"
            : "Edit your profile"
        }
        severity={action === "editProfile" ? "success" : "info"}
        funcToExecute={() => {
          setAction("editProfile");
        }}
      />
      <TheButton
        icon={faPenNib}
        label={action === "writePost" ? "Writing..." : "Write new Post"}
        severity={action === "writePost" ? "success" : "info"}
        funcToExecute={() => {
          setAction("writePost");
        }}
      />
      <TheButton
        icon={faBookBookmark}
        label={action === "seePosts" ? "Your Posts" : "See all your posts"}
        severity={action === "seePosts" ? "success" : "info"}
        funcToExecute={() => {
          setAction("seePosts");
        }}
      />
    </div>
  );
};
