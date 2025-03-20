'use client'

import CodeEditor from "@/components/CodeEditor";
import { useState } from "react";
import useResizing from "./hooks/useResizing";

const Draggable = () => {
  const { width, componentAtributes } = useResizing({ min: 200, max: 1200, value: 500 });
  
  return (
    <div
      className="h-lvh flex"
    >
      <CodeEditor widthScale={width} />
      <div {...componentAtributes} />
    </div>
  );
}

export default Draggable;