import { useState } from "react";
import { TheTextEditor } from "../UI/the-text-editor";

export const CreatePost = () => {
  const [content, setContent] = useState(second);

  return (
    <section>
      
      <TheTextEditor content={content} setContent={setContent} />
    </section>
  );
};
