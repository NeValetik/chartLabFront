'use client'

import { FC, useEffect } from "react";
import useResizing from "./hooks/useResizing";

const Draggable: FC<
  {
    setWidth: ( width:number ) => void;
    min: number,
    max?: number,
    value?: number,
  }
> = ( { setWidth, min, max, value } ) => {
  const { width, componentAttributes } = useResizing({ min: min, max: max ?? 1200 , value: value ?? 500 });
  const { className, onMouseDown } = componentAttributes;
  useEffect(()=>{
    setWidth( width );
  }, [ width, setWidth ])
  return (
    <div className={`${className} bg-monokai-gray-500 flex flex-col justify-center`} onMouseDown={onMouseDown}>
      <div className="overflow bg-monokai-gray-100 w-2 h-8 z-10 items-center translate-x-[-2px] rounded-full -translate-y-[40px]" />
    </div>
  );
}

export default Draggable;