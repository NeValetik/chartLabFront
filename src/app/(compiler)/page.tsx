'use client'

import CodeEditor from "@/components/CodeEditor";
import { useState } from "react";
import Draggable from "@/components/DragableObject";

const InitialPage = () => {
  const [ width, setWidth ] = useState( 500 );

  return (
    <div
      className="h-lvh flex"
    >
      <CodeEditor widthScale={width} />
      <Draggable 
        min={200} 
        max={1200} 
        value={width} 
        setWidth={setWidth} 
      />
    </div>
  );
}

export default InitialPage;