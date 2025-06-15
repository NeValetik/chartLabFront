"use client";

import Button from "@/components/Button";
import { RiGithubFill } from "@remixicon/react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
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
            src="/white.svg"
            alt="logo"
            width={ 50 }
            height={ 50 }
          />
        </div>  
        <p className="font-bold text-2xl text-monokai-yellow">
          ChartLab
        </p>
      </div>
      
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton
              as={Button}
              variant="primary"
              size="small"
              tone="yellow"
              className="data-[open]:!bg-monokai-yellow data-[open]:!text-monokai-gray-1000"
            >
              <div className="text-xl font-bold">
                <RiGithubFill
                  size={24}   
                  className="h-6 w-6"
                />
              </div>
            </PopoverButton>

            <PopoverPanel
              className="
                absolute right-0 mt-2 z-50
                bg-monokai-gray-800 p-4
                rounded-md border-monokai-gray-1000 border
                shadow-lg w-48 space-y-3
              "
            >
              <div className="flex flex-col gap-3">
                <Link
                  href="https://github.com/NeValetik/ChartLab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="primary"
                    size="medium"
                    tone="yellow"
                    className="w-full justify-center"
                  >
                    <div className="text-sm font-bold flex items-center gap-2">
                      <RiGithubFill size={24} />
                      Server Repo
                    </div>
                  </Button>
                </Link>
                
                <Link
                  href="https://github.com/NeValetik/chartLabFront"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="primary"
                    size="medium"
                    tone="yellow"
                    className="w-full justify-center"
                  >
                    <div className="text-sm font-bold flex items-center gap-2">
                      <RiGithubFill size={24} />
                      Client Repo
                    </div>
                  </Button>
                </Link>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default Header;