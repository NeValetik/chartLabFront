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
    <div className="h-lvh flex">
      <div style={{ flex: `0 0 ${width}px` }}>
        <CodeEditor widthScale={width} onRunClick={handleOnRunClick}/>
      </div>
      <Draggable min={200} max={1200} value={width} setWidth={setWidth} />
      {image ? (
        <div 
          style={{ flex: `1` }}
          className="select-none w-full h-full bg-monokai-gray-800"
        >
          <Image
            src={image}
            alt="Graph"
            width={width}
            height={1080}
            className="w-full h-auto"
          />
        </div>
      ) : (
        <div 
          style={{ flex: `1` }}
          className="select-none w-full h-full bg-monokai-gray-800"
        >

        </div>
      )
      }
    </div>
  );
}

export default InitialPage;