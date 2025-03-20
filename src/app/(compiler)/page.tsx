'use client'

import CodeEditor from "@/components/CodeEditor";
import { useEffect, useRef, useState } from "react";

const InitialPage = () => {
  const [editorWidth, setEditorWidth ] = useState<number>(500);
  const isResizing = useRef(false);
  
  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    setEditorWidth(e.clientX);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(()=>{
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove",handleMouseMove);
      document.removeEventListener("mouseup",handleMouseUp);
    } 
  }, [ handleMouseMove, handleMouseUp ]);

  return (
    <div
      className="h-lvh flex"
    >
      <CodeEditor widthScale={editorWidth} />
      <div 
        className="w-1 cursor-ew-resize"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

export default InitialPage;