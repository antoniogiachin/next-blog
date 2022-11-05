import Image from "next/image";
import classes from "./hero.module.css";

import { useState } from "react";
// FA
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Hero = () => {
  const [showInfos, setShowInfos] = useState(false);

  const handleShowInfos = () => {
    setShowInfos((prevShowInfoStatus) => !prevShowInfoStatus);
  };

  return (
    <div className={classes.hero}>
      <div className={classes["image-container"]}>
        <Image
          src={"/images/UI/profile-picture.jpg"}
          alt={"profile-picture-a-giachin"}
          width={300}
          height={600}
        />
      </div>
      <div className={classes["desc-container"]}>
        <h3>
          Hello, I&apos;m Antonio Giachin, a Full-Stack Web Developer! I love
          teach and help people, learn new technlogies, and improve my coding
          skills! Feel free to register, write new posts and keep in touch with
          me! See ya!
        </h3>
        <h3>
          {!showInfos && (
            <span
              onClick={handleShowInfos}
              className={classes["desc-mobile-button"]}
            >
              Learn More About me!
            </span>
          )}
          {showInfos && (
            <div className={classes["desc-mobile-container"]}>
              <span>
                Hello, I&apos;m Antonio Giachin, a Full-Stack Web Developer! I
                love teach and help people, learn new technlogies, and improve
                my coding skills! Feel free to register, write new posts and
                keep in touch with me! See ya!
              </span>
              <span>
                <FontAwesomeIcon
                  onClick={handleShowInfos}
                  className={classes["desc-mobile-button"]}
                  icon={faXmark}
                />
              </span>
            </div>
          )}
        </h3>
      </div>
    </div>
  );
};
