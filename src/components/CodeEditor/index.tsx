'use client'

import { useState, memo, FC } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor: FC<
  {
    widthScale: number;
  }
> = (props) => {
  const [ code, setCode ] = useState("// Type here...");

  const { widthScale } = props;
  const min = 300;
  const max = 1200;
  const width = min > widthScale ? min : max < widthScale ? max : widthScale 

  return (
    <div style={
      {
        width: width,
        height: "100%",
        borderRadius: "2px",
      } 
    }>
      <Editor
        height="100%"
        defaultLanguage=""
        defaultValue={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
        options={{
          quickSuggestions: false, 
          suggestOnTriggerCharacters: false, 
          parameterHints: { enabled: false }, 
          wordBasedSuggestions: "off", 
          autoClosingBrackets: "never", 
          autoClosingQuotes: "never", 
        }}
      />
    </div>
  );
};

export default memo(CodeEditor);