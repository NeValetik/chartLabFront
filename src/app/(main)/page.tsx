'use client'

import { useState, useCallback } from "react";
import { saveTemplate, sendCode } from "@/components/CodeEditor/utils";

import CodeEditor from "@/components/CodeEditor";
import Draggable from "@/components/DragableObject";
import ImageSection from "@/components/ImageSection";
import { useRouter } from "next/navigation";

const InitialPage = () => {
  const [ width, setWidth ] = useState<number>( 700 );
  const [ image, setImage ] = useState<string>( "" );
  const [ loading, setLoading ] = useState<boolean>( false );

  const { refresh } = useRouter();
  
  const handleOnRunClick = useCallback((code: string, files?: File[] | null) => async() => {
    setImage("");
    setLoading(true);
    if (files){
      console.log(files);
    } 
    const resp = await sendCode(code);
    setTimeout(()=>{setLoading(false)},2600)
    if (resp.length>0){
      setTimeout(()=>{setImage(resp)},2600);
    };
  }, []);

  const handleOnSaveClick = useCallback(( code: string ) => async() => {
    const resp = await saveTemplate(code);
    if (resp.length>0){
      refresh();
    } else {
      console.error("Error saving temlpate")
    }
  }, [ refresh ]);

  return (
    <div className="h-lvh flex">
      <div style={{ flex: `0 0 ${width}px` }} className="h-full">
        <CodeEditor widthScale={width} onRunClick={handleOnRunClick} onSaveClick={handleOnSaveClick}/>
      </div>
      <Draggable min={200} max={1200} value={width} setWidth={setWidth} />
      <ImageSection image={image} loading={loading} />
    </div>
  );
}

export default InitialPage;