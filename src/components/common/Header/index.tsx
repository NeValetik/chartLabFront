// import { useState, memo, FC } from "react";
import Button from "@/components/Button";
import Image from "next/image";

const Header = () => {
  return (
    <div className="
      w-full flex 
      bg-monokai-gray-1000
      py-2 px-8 
      items-center justify-between 
    ">
      <div className="flex items-center gap-3">
        <div>
          <Image 
            src="logo.svg"
            alt="logo"
            width={ 40 }
            height={ 40 }
            className="h-auto w-10" 
            />
        </div>  
        <p className="font-bold text-2xl text-monokai-yellow">
          ChartLab
        </p>
      </div>
      <div>
        <Button
          variant="primary"
          size="small"
          tone="yellow"
        >
          <div
            className="text-xl font-bold"
          >
            Docs
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Header;