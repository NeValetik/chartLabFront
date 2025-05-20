'use client'

import { FC } from "react";

import LoadingAnimation from "./components/LoadingAnimation";
import Plot from 'react-plotly.js';

const ImageSection: FC<
  {
    loading: boolean,
    plot: null | any,
  }
> = ( { loading, plot } ) => {

  if (!(Object.keys(plot).length !== 0) && !loading) {
    return (
    <div 
      style={{ flex: `1` }}
      className="select-none w-full h-full bg-monokai-gray-800 flex justify-center items-center"
    >
    </div>
    )
  }

  if( loading && !(Object.keys(plot).length !== 0) ){
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
      className="select-none w-full h-full bg-monokai-gray-800 overflow-y-auto"
    >
      <Plot
        data={plot?.data} 
        layout={plot?.layout}
        config={{ displaylogo: false }}
        className="w-full h-full"
        style={{ flex: `1` }}
        useResizeHandler
      />
    </div>
  );
}

export default ImageSection;