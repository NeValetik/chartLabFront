'use client'

import { useState, useCallback } from "react";
import { sendCode } from "@/components/CodeEditor/utils";

import CodeEditor from "@/components/CodeEditor";
import Draggable from "@/components/DragableObject";
import Image from "next/image";

const InitialPage = () => {
  const [ width, setWidth ] = useState<number>( 500 );
  const [ image, setImage ] = useState<string>( "" );

  const handleOnRunClick = useCallback((code: string) => async() => {
    const resp = await sendCode(code);
    if (resp.length>0){
      setImage(resp);
    };
  }, []);

  return (
    <div
      className="h-lvh flex"
    >
      <CodeEditor 
        widthScale={width} 
        onRunClick={handleOnRunClick}
      />
      <Draggable 
        min={200} 
        max={1200} 
        value={width} 
        setWidth={setWidth} 
      />
      {image&&
        <Image src={image} alt="Graph" width={width} height={1080} className="w-full h-full"/>
      }
    </div>
  );
}

export default InitialPage;