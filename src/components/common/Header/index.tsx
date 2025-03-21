// import { useState, memo, FC } from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full flex bg-[#1E1E1E] py-2 px-8 items-center gap-3 border border-gray-900  ">
      <div>
        <Image 
          src="logo.svg"
          alt="logo"
          width={ 40 }
          height={ 40 }
          className="h-auto w-10" 
        />
      </div>  
      <p className="font-bold text-2xl text-gray-500">
        ChartLab
      </p>
    </div>
  );
};

export default Header;