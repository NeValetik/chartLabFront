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
import FileInputForm from "./components/FileInputForm";
import { useNotification } from "../Notification/useNotification";

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
    onRunClick: (code: string, files: File[]) => () => void;
    onSaveClick: (code: string, name: string ) => () => void;
  }
> = (props) => {
  const { widthScale, onRunClick , onSaveClick} = props;
  
  const form = useForm();
  // const {
  //   setValue,
  //   handleSubmit
  // } = form;
  
  const [ files ] = useState<File[] | null>(null)
  const [ code, setCode ] = useState("// Type here...");
  const { templates } = useTemplates( { setCode } );
  const [ fileName, setFileName ] = useState("");
  const { showInfo } = useNotification();

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
        <div className="flex justify-between bg-monokai-gray-800 px-3 py-1 min-w-[436px]">
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
                  mt-2
                  bg-monokai-gray-800 p-3
                  rounded divide-y-2 divide-monokai-gray-700
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
                          className="cursor-pointer font-bold text-monokai-gray-500"
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
            <div className="relative">

              <input
                type="text"
                placeholder="File Name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="px-2 py-1 rounded bg-monokai-gray-700 text-monokai-gray-500 focus:outline-none"
              />
              <Button
                variant={fileName ? "primary-inverted" : "primary"}
                tone="yellow"
                size="small"
                className="
                  absolute right-1 top-1 
                  text-base font-bold 
                  data-[disabled=true]:!bg-monokai-gray-700
                "
                disabled={!fileName}
                data-disabled={!fileName}
                onClick={()=>{
                  onSaveClick(code, `${fileName}.ch`)();
                  setFileName("");
                  showInfo("Template saved", 5000);
                }}
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
                ${widthScale > 565 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                ${widthScale <= 540 ? "hidden" : ""}
              `}
            >
              <Button
                variant="primary"
                tone="yellow"
                size="medium"
                className="text-base font-bold whitespace-nowrap"
                // onClick={onRunClick(code)}
              >
                View files
              </Button>
            </div>
            <div 
              className={`
                flex gap-4
                transition-all duration-300 
                ${widthScale > 707 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                ${widthScale <= 700 ? "hidden" : ""}
              `}
            >
              <FileInputForm />
            </div>
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