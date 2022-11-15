import { useState } from "react";
import { TheTextEditor } from "../UI/the-text-editor";
import { TheFileUploader } from "../UI/the-file-uploader";

import classes from "./create-post.module.css";
import { TheButton } from "../UI/the-button";

import { faSave } from "@fortawesome/free-solid-svg-icons";

import { useApi } from "../../hooks/useApi";

import { useDispatch } from "react-redux";
import { SET_NOTIFICATION } from "../../store/slicers/appStatusSlice";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const { postApi } = useApi();

  const dispatch = useDispatch();

  const handleSavePost = async () => {
    const postToSave = {
      title,
      content,
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", files[0]);

    await postApi("/api/posts", formData, true);

    dispatch(
      SET_NOTIFICATION({
        show: true,
        severity: "success",
        text: `${title} successfullly created!`,
      })
    );
  };

  return (
    <article className={classes["create-post-container"]}>
      <h1>Publish Your Post!</h1>
      <p className={classes["create-post-ph"]}>Choose title</p>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <p className={classes["create-post-ph"]}>Select thumbnail</p>
      <TheFileUploader files={files} setFiles={setFiles} />
      <p className={classes["create-post-ph"]}>Write your post</p>
      <TheTextEditor content={content} setContent={setContent} />
      <div className={classes["create-post-actions"]}>
        <TheButton
          funcToExecute={handleSavePost}
          icon={faSave}
          label="Save Post"
        />
      </div>
    </article>
  );
};
