'use client'

import { FC } from "react";

import Image from "next/image";
import LoadingAnimation from "./components/LoadingAnimation";

const ImageSection: FC<
  {
    loading: boolean,
    image: string,
  }
> = ( { loading, image } ) => {

  if (!image && !loading) {
    return (
    <div 
      style={{ flex: `1` }}
      className="select-none w-full h-full bg-monokai-gray-800 flex justify-center items-center"
    >
    </div>
    )
  }

  if( loading && !image ){
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
      <Image
        src={image}
        alt="Graph"
        width={1980}
        height={1080}
        className="w-full h-auto"
      />
    </div>
  );
}

export default ImageSection;