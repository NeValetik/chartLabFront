'use client'

import { useState, memo, FC } from "react";
import { RiPlayLargeFill } from "@remixicon/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

import Button from "../Button";
import Editor from "@monaco-editor/react";
import useTemplates from "./hooks/useTemplates";

export interface Template{
  key: string;
  label: string;
  onClick: () => void;
  code: string;
};

// here should be fetched
const CodeEditor: FC<
  {
    widthScale: number;
    onRunClick: (code:string) => () => void;
  }
> = (props) => {
  const { widthScale, onRunClick } = props;
  
  const [ code, setCode ] = useState("// Type here...");

  const { templates } = useTemplates({setCode});
  
  return (
    <div 
      style={
        {
          width: widthScale,
          height: "100%",
          borderRadius: "2px", 
        } 
      }
    >
      <div className="flex justify-between bg-[#383838] px-3">
        <Menu>
          <MenuButton
            className="
              rounded px-1 my-1 bg-[#2C927E]
              text-[#C9C9C9]
              cursor-pointer
            "
          >
            Templates
          </MenuButton>
          <MenuItems 
            anchor="bottom start"
            className="
              bg-gray-300 p-3
              rounded divide-y-2 divide-gray-400
            "
          >
            {templates.map((template)=> 
              {
                return (
                  <MenuItem 
                    as="div"
                    key={template.key} 
                  >
                    <button
                      className="cursor-pointer"
                      type="button"
                      onClick={()=>setCode(template.code)}
                    >
                      {template.label}
                    </button>
                  </MenuItem>
                );
              })
            }
          </MenuItems>
        </Menu>
        <div className="p-1">
          <button 
            className="rounded-full p-2 bg-[#2C927E] cursor-pointer"
            onClick={onRunClick(code)}
          >
            <RiPlayLargeFill
              size={16} 
              className="h-4 w-4"
              color="#6A7282"
            />
          </button>
        </div>
      </div>
      <Editor
        height="100%"
        defaultLanguage=""
        defaultValue={code}
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
        options={{
          quickSuggestions: false, 
          suggestOnTriggerCharacters: false, 
          parameterHints: { enabled: false }, 
          wordBasedSuggestions: "off", 
          autoClosingBrackets: "never", 
          autoClosingQuotes: "never",
          minimap:{
            enabled: false,
          }
           
        }}
      />
    </div>
  );
};

export default memo(CodeEditor);