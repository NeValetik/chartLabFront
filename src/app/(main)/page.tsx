'use client'

import { useState, useCallback } from "react";
import { saveTemplate, sendCode } from "@/components/CodeEditor/utils";

import CodeEditor from "@/components/CodeEditor";
import Draggable from "@/components/DragableObject";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

const ImageSection = dynamic(() => import('@/components/ImageSection'), {
  ssr: false,
});

const InitialPage = () => {
  const [ width, setWidth ] = useState<number>( 700 );
  const [ plots, setPlots ] = useState<object[] | null>( [] );
  const [ loading, setLoading ] = useState<boolean>( false );

  const { refresh } = useRouter();
  
  const handleOnRunClick = useCallback((code: string, files?: File[] | null) => async() => {
    setPlots([]);
    setLoading(true);
    if (files){
      console.log(files);
    } 
    const resp: object[] | null = await sendCode(code);
    console.log(resp)
    setTimeout(()=>{setLoading(false)},2600)
    if (resp && Object.keys(resp).length>0){
      setTimeout(()=>{setPlots(resp)},2600);
    };
  }, []);

  const handleOnSaveClick = useCallback(( code: string, name: string ) => async() => {
    const resp = await saveTemplate(code, name);
    if (resp.length>0){
      refresh();
    } else {
      console.error("Error saving temlpate")
    }
  }, [ refresh ]);

  return (
    <div className="h-screen flex">
      <div style={{ flex: `0 0 ${width}px` }} className="]">
        <CodeEditor widthScale={width} onRunClick={handleOnRunClick} onSaveClick={handleOnSaveClick}/>
      </div>
      <Draggable min={200} max={1200} value={width} setWidth={setWidth} />
      <ImageSection plots={plots} loading={loading} />
    </div>
  );
}

export default InitialPage;