'use client'

import { useCallback, useEffect, useRef, useState } from "react";

interface ResizingProps{
  min: number;
  max?: number;
  value?: number;
} 

interface ResizeReturnType{
  width: number;
  componentAttributes: {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void,
    className: string,
  }
}

const useResizing = (props:ResizingProps) : ResizeReturnType => {

  const { min, max, value } = props;

  const isResizing = useRef(false);
  const [ width, setWidth ] = useState( value ?  value : min )

  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    setWidth(Math.min(max ?? Infinity, Math.max(min, e.clientX)));
  }, [ setWidth, max, min ]);

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
  }, [ handleMouseMove ]);

  return (
    {
      width: width,
      componentAttributes: {
        onMouseDown: handleMouseDown,
        className: "w-1 cursor-ew-resize"
      } 
    }
  )
}

export default useResizing;