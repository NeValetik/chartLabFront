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
  const [ plot, setPlot ] = useState<object | null>( {} );
  const [ loading, setLoading ] = useState<boolean>( false );

  const { refresh } = useRouter();
  
  const handleOnRunClick = useCallback((code: string, files?: File[] | null) => async() => {
    setPlot({});
    setLoading(true);
    if (files){
      console.log(files);
    } 
    const resp = await sendCode(code);
    setTimeout(()=>{setLoading(false)},2600)
    if (resp && Object.keys(resp).length>0){
      setTimeout(()=>{setPlot(resp)},2600);
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
    <div className="h-lvh flex">
      <div style={{ flex: `0 0 ${width}px` }} className="h-full">
        <CodeEditor widthScale={width} onRunClick={handleOnRunClick} onSaveClick={handleOnSaveClick}/>
      </div>
      <Draggable min={200} max={1200} value={width} setWidth={setWidth} />
      <ImageSection plot={plot} loading={loading} />
    </div>
  );
}

export default InitialPage;