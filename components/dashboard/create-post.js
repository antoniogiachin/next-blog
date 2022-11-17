import { useState, useRef, useEffect } from "react";
import { TheTextEditor } from "../UI/the-text-editor";
import { TheFileUploader } from "../UI/the-file-uploader";

import classes from "./create-post.module.css";
import { TheButton } from "../UI/the-button";

import { faSave } from "@fortawesome/free-solid-svg-icons";

import { useApi } from "../../hooks/useApi";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import {
  SET_ERROR,
  SET_NOTIFICATION,
  isLoadingStatus,
} from "../../store/slicers/appStatusSlice";

export const CreatePost = ({ handleRedirectAction }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const isLoading = useSelector(isLoadingStatus);

  const { postApi } = useApi();

  const titleInputRef = useRef();

  const dispatch = useDispatch();

  const handleSavePost = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", files[0]);

    try {
      await postApi("/api/posts", formData, true);
    } catch (err) {
      dispatch(SET_ERROR(err.message || "Error Creating Post"));
    }

    dispatch(
      SET_NOTIFICATION({
        show: true,
        severity: "success",
        text: `${title} successfullly created!`,
      })
    );

    setTitle("");
    setContent("");
    setFiles("");
    titleInputRef.current.value = "";
    handleRedirectAction(
      "posts",
      { title: title.replaceAll(" ", "-") },
      "seePosts"
    );
  };

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  return (
    <article className={classes["create-post-container"]}>
      <h1>Publish Your Post!</h1>
      <p className={classes["create-post-ph"]}>Choose title</p>
      <input
        ref={titleInputRef}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className={classes["create-post-ph"]}>Select thumbnail</p>
      <TheFileUploader files={files} setFiles={setFiles} />
      <p className={classes["create-post-ph"]}>Write your post</p>
      <TheTextEditor content={content} setContent={setContent} />
      <div className={classes["create-post-actions"]}>
        <TheButton
          isLoading={isLoading}
          disabledProps={!title || !files || !content}
          funcToExecute={handleSavePost}
          icon={faSave}
          label="Save Post"
        />
      </div>
    </article>
  );
};
