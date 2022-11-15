import "react-quill/dist/quill.snow.css";

import classes from "./the-text-editor.module.css";

import dynamic from "next/dynamic";
// import dinamico dell'editor (non ho interesse che sia SSR)
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// module per Quill e i formati disponibili per Editor
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["image", "video"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 *
 *  https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "image",
  "video",
];

export const TheTextEditor = ({ content, setContent }) => {
  // const [content, setContent] = useState("");

  return (
    <div className={classes["editor-container"]}>
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme={"snow"}
        value={content}
        onChange={(e) => {
          setContent(e);
        }}
      />
    </div>
  );
};
