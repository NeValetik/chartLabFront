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
  const { width, componentAttributes } = useResizing({ min: min, max: max && 1200 , value: value && 500 });
  const { className, onMouseDown } = componentAttributes;
  useEffect(()=>{
    setWidth(width);
  }, [ width, setWidth ])
  return (
    <div className={`${className} bg-monokai-gray-500 flex flex-col justify-center`} onMouseDown={onMouseDown}>
      <div className="overflow-x-visible ">
        
      </div>
    </div>
  );
}

export default Draggable;