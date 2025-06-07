// import { useState, memo, FC } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

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
            src="/logo.svg"
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
      <Link
        href="https://github.com/NeValetik/ChartLab"
      >
        <Button
          variant="primary"
          size="small"
          tone="yellow"
        >
          <div
            className="text-xl font-bold"
          >
            Server
          </div>
        </Button>
      </Link>
      <Link
        href="https://github.com/NeValetik/chartLabFront"
      >
        <Button
          variant="primary"
          size="small"
          tone="yellow"
        >
          <div
            className="text-xl font-bold"
          >
            Client
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default Header;