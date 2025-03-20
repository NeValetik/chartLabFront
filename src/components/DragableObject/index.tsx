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
  const { width, componentAtributes } = useResizing({ min: min, max: max && 1200 , value: value && 500 });
  useEffect(()=>{
    setWidth(width);
  }, [ width, setWidth ])
  return (
    <div {...componentAtributes} />
  );
}

export default Draggable;