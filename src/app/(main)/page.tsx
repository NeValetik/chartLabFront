'use client'

import { useState, useCallback } from "react";
import { sendCode } from "@/components/CodeEditor/utils";

import CodeEditor from "@/components/CodeEditor";
import Draggable from "@/components/DragableObject";
import ImageSection from "@/components/ImageSection";

const InitialPage = () => {
  const [ width, setWidth ] = useState<number>( 700 );
  const [ image, setImage ] = useState<string>( "" );
  const [ loading, setLoading ] = useState<boolean>( false );

  const handleOnRunClick = useCallback((code: string) => async() => {
    setImage("");
    setLoading(true);
    const resp = await sendCode(code);
    setTimeout(()=>{setLoading(false)},2600)
    if (resp.length>0){
      setTimeout(()=>{setImage(resp)},2600);
    };
  }, []);

  return (
    <div className="h-lvh flex">
      <div style={{ flex: `0 0 ${width}px` }}>
        <CodeEditor widthScale={width} onRunClick={handleOnRunClick}/>
      </div>
      <Draggable min={200} max={1200} value={width} setWidth={setWidth} />
      <ImageSection image={image} loading={loading} />
    </div>
  );
}

export default InitialPage;