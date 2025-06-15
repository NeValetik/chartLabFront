'use client'

import { FC, useEffect, useState } from "react";

import LoadingAnimation from "./components/LoadingAnimation";
import Plot from 'react-plotly.js';
import Button from "../Button";
import NotificationContainer from "../Notification/NotificationContainer";
import { useNotification } from "../Notification/useNotification";

const ImageSection: FC<
  {
    loading: boolean,
    plots: null | object[],
  }
> = ( { loading, plots } ) => {

  const [currentPlotNumber, setCurrentPlotNumber] = useState<number>(0);
  const totalPlots = plots?.length || 0;
  const [plotToShow, setPlotToShow] = useState<any>({});
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  useEffect(()=>{
    if (loading) {
      setCurrentPlotNumber(0);
    }
  }, [ loading ]);

  useEffect(()=>{
    const handleMouseMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const container = mouseEvent.currentTarget as HTMLElement;
      const rect = container.getBoundingClientRect();
      const mouseY = mouseEvent.clientY - rect.top;
      const containerHeight = rect.height;
      
      // Check if mouse is in lower 20% of container height
      const isInLowerTwentyPercent = mouseY >= (containerHeight * 0.8);
      setIsHovered(isInLowerTwentyPercent);
    }
    
    const handleMouseLeave = () => {
      setIsHovered(false);
    }
    
    // Get the main container div instead of .plot-container
    const container = document.querySelector('div[style*="flex: 1"]');
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    }
  }, []);

  const handlePlotChange = (delta: number = 1) => {
    const newPlotNumber = currentPlotNumber + delta;
    setCurrentPlotNumber(newPlotNumber);
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
      <div 
        className="
          absolute 
          bottom-18 left-5 right-0 
          flex z-50 justify-center 
          transition-all duration-300
          opacity-0
          invisible
          gap-2 data-[hovered=true]:opacity-100 data-[hovered=true]:visible
        "
        data-hovered={isHovered}
      >
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