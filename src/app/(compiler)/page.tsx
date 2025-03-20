'use client'

import CodeEditor from "@/components/CodeEditor";
import { useState } from "react";

const InitialPage = () => {
  const [editorWidth, setEditorWidth ] = useState<number>(500);  
  return (
    <div
      className="h-lvh flex"
    >
      <CodeEditor widthScale={editorWidth} />
      <button
        className=" bg-amber-100 "
        type="button"
        onClick={() => {
          setEditorWidth((prev)=>prev+100);
        }}
      >
        tap here to increase size
      </button>
    </div>
  );
}

export default InitialPage;