import React, { useState } from "react";

import Editor from "@monaco-editor/react";

interface ICodeEditorWindow { 
	onEdit: (data:string)=>void
	language: string,
	code: string
} 

const CodeEditorWindow = ({ onEdit, language, code }:ICodeEditorWindow) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value: any) => {
    setValue(value);
    onEdit(value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme="vs-dark"
        defaultValue="// some comment"
				onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;