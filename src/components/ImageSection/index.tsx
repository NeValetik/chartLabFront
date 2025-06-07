'use client'

import { FC, useEffect, useState } from "react";

import LoadingAnimation from "./components/LoadingAnimation";
import Plot from 'react-plotly.js';
import Button from "../Button";

const ImageSection: FC<
  {
    loading: boolean,
    plots: null | object[],
  }
> = ( { loading, plots } ) => {

  const [currentPlotNumber, setCurrentPlotNumber] = useState<number>(0);
  const totalPlots = plots?.length || 0;
  const [plotToShow, setPlotToShow] = useState<any>({});

  const handlePlotChange = (delta: number = 1) => {
    setCurrentPlotNumber((prev)=> prev + delta);
  }

  useEffect(()=>{
    setPlotToShow(!!plots?.length ? plots[currentPlotNumber] : {});
  }, [plots, currentPlotNumber]) 

  if (!(plots?.length) && !loading) {
    return (
    <div 
      style={{ flex: `1` }}
      className="select-none w-full h-full bg-monokai-gray-800 flex justify-center items-center"
    >
    </div>
    )
  }

  if( loading && !(plots?.length) ){
    return (
      <div 
        style={{ flex: `1` }}
        className="select-none w-full h-full bg-monokai-gray-800 flex justify-center items-center"
      >
        <LoadingAnimation />
      </div>
    )
  }

  return (
    <div 
      style={{ flex: `1` }}
      className="relative select-none w-full h-full bg-monokai-gray-800 overflow-y-hidden"
    >
      <Plot
        data={plotToShow?.data} 
        layout={plotToShow?.layout}
        config={{ displaylogo: false }}
        className="w-full h-full"
        style={{ flex: `1` }}
        useResizeHandler
      />
      <div className="absolute bottom-3 left-5 right-0 flex z-50 justify-center gap-2">
        <Button
          aria-label="Previous"
          variant="primary"
          tone="violet"
          disabled={currentPlotNumber <= 0 }
          className="!rounded-full"
          onClick={ () => {handlePlotChange(-1);} }
        >
          {`<`}
        </Button>
        <div
          className="flex items-center "
        >
          {currentPlotNumber+1} of {totalPlots}
        </div>
        <Button
          aria-label="Next"
          variant="primary"
          tone="violet"
          disabled={currentPlotNumber >= totalPlots-1 }
          className="!rounded-full"
          onClick={ () => {handlePlotChange(1);}}
        >
          {`>`}
        </Button>
      </div>
    </div>
  );
}

export default ImageSection;