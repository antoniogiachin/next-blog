import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { SET_ERROR } from "../../store/slicers/appStatusSlice";

import classes from "./the-file-uploader.module.css";

export const TheFileUploader = ({ multiple, files, setFiles }) => {
  // const [files, setFiles] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const inputRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isUploaded) {
      inputRef.current.value = "";
      setIsUploaded(false);
    }
  }, [isUploaded]);

  const handleUploadFiles = (event) => {
    if (!multiple) {
      dispatch(SET_ERROR("You can upload only 1 file!"));
      return;
    }

    if (files.find((f) => f.name === event.target.files[0].name)) {
      dispatch(SET_ERROR("File already Uploaded!"));
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...event.target.files]);
    setIsUploaded(true);
  };

  const handleFileDelete = (fileName) => {
    setFiles(files.filter((f) => f.name !== fileName));
  };

  let filesPreview;

  if (files && files.length > 0) {
    filesPreview = files.map((f) => (
      <div className={classes["file-preview"]} key={f.name}>
        <p>
          <strong>Name:</strong> <span>{f.name}</span>
        </p>
        <p>
          <strong>Size:</strong> {(f.size / 1024 ** 2).toFixed(2)} MB
        </p>
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => {
              handleFileDelete(f.name);
            }}
          />
        </div>
      </div>
    ));
  }

  return (
    <div className={classes["file-uploader-container"]}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleUploadFiles}
        style={{ display: "none" }}
        id="files"
      />
      <label className={classes["file-uploader-button"]} htmlFor="files">
        Select file
      </label>
      {files.length > 0 && (
        <div className={classes["file-preview-container"]}>{filesPreview}</div>
      )}
    </div>
  );
};

TheFileUploader.defaultProps = {
  multiple: false,
  files: [],
};
