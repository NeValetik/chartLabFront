'use client'

import { useState, memo, FC } from "react";
import { 
  RiPlayLargeFill,
  RiFileAddLine,
  RiStickyNoteAddLine
} from "@remixicon/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import FileInput from "../Form/FileInput";

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
    onRunClick: (code:string, files: File[]) => () => void;
    onSaveClick: (code:string) => () => void;
  }
> = (props) => {
  const { widthScale, onRunClick , onSaveClick} = props;
  
  const form = useForm();
  const {
    setValue,
    handleSubmit
  } = form;
  
  const [ files ] = useState<File[] | null>(null)
  const [ code, setCode ] = useState("// Type here...");
  const { templates } = useTemplates( { setCode } );

  return (
    <FormProvider { ...form } >
      <div 
        style={
          {
            width: widthScale,
          } 
        }
        className="h-full overflow-hidden "
      >
        <div className="flex justify-between bg-monokai-gray-800 px-3 py-1">
          <div className="flex gap-4 items-center">
            <Menu>
              <MenuButton
                className="
                  rounded 
                  transition-colors
                  flex justify-center items-center 
                  cursor-pointer
                  gap-1
                  data-[hover]:bg-monokai-yellow
                  data-[hover]:data-[active]:bg-monokai-green
                  bg-monokai-gray-700
                  text-monokai-gray-500
                  data-[hover]:text-monokai-gray-1000
                  py-2 px-4 
                  font-bold
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
            <Button
              variant="primary"
              tone="yellow"
              size="large"
              className="text-base font-bold"
              onClick={onSaveClick(code)}
            >
              <RiStickyNoteAddLine
                size={16} 
                className="h-4 w-4"
              />
            </Button>
          </div>
          <div 
            className={`
              flex gap-4
              transition-all duration-300 
              ${widthScale > 500 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
            `}
            hidden={ widthScale <= 480 }
          >
            <Button
              variant="primary"
              tone="yellow"
              size="medium"
              className="text-base font-bold"
              // onClick={onRunClick(code)}
            >
              View files
            </Button>
            <Menu>
              <MenuButton
                className="
                  rounded 
                  transition-colors
                  flex justify-center items-center 
                  cursor-pointer
                  gap-1
                  data-[hover]:bg-monokai-yellow
                  data-[hover]:data-[active]:bg-monokai-green
                  bg-monokai-gray-700
                  text-monokai-gray-500
                  data-[hover]:text-monokai-gray-1000
                  py-3 px-6 
                  font-bold
                "
              >
                <RiFileAddLine
                  size={16} 
                  className="h-4 w-4"
                />
              </MenuButton>
              <MenuItems 
                anchor="bottom start"
                className="
                  mt-1
                  bg-monokai-gray-800 p-3
                  rounded border-monokai-gray-1000 border
                "
              >
                <MenuItem 
                  as="div"
                  onClick={(e) => e.preventDefault()}
                >
                  <FileInput />                  
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          <div className="flex gap-4">
            <div>
              <Button
                variant="primary-inverted"
                tone="green"
                size="large"
                onClick={onRunClick(code, files ?? [])}
              >
                <RiPlayLargeFill
                  size={16} 
                  className="h-4 w-4"
                />
              </Button>
            </div>
          </div>

        </div>
        <Editor
          height="100%"
          defaultLanguage=""
          defaultValue={code}
          value={code}
          loading={<div className="w-full h-full bg-monokai-gray-1000 text-monokai-gray-100 flex justify-center items-center">
            <span>Loading Editor...</span>
          </div>}
          theme= "vs-dark"
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
    </FormProvider>
  );
};

export default memo(CodeEditor);