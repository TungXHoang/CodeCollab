import { useState } from "react";

import Editor from "@monaco-editor/react";
import { ICodeEditorWindow } from "./ICodeEditorWindow";


const CodeEditorWindow = ({ onEdit, language, code }:ICodeEditorWindow) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value: string | undefined) => {
    setValue(value!);
    onEdit(value!);
  };
	return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language}
        value={value}
        theme="vs-dark"
        defaultValue="// some comment"
				onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;