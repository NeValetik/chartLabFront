'use client'

import { useState, memo, FC } from "react";
import { 
  RiPlayLargeFill,
  RiStickyNoteAddLine
} from "@remixicon/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import { saveData } from "./utils";

import Button from "../Button";
import Editor from "@monaco-editor/react";
import useTemplates from "./hooks/useTemplates";
import FileInputForm from "./components/FileInputForm";
import useStatisticData from "./hooks/useStatisticData";
import { useNotification } from "@/contexts/NotificationContext";

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
  
  const [ files, setFiles ] = useState<File[]>([])
  const [ code, setCode ] = useState("// Type here...");
  const { templates, refetch: refetchTemplates } = useTemplates( { setCode } );
  const { statisticData, refetch: refetchStatisticData } = useStatisticData( { setCode } );
  const [ fileName, setFileName ] = useState("");
  const { showError } = useNotification();

  const handleFileUpload = (file: File) => {
    setFiles(prev => [...prev, file]);
  };

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
        <div className="flex justify-between bg-monokai-gray-800 px-3 py-1 min-w-[205px]">
          <div className="flex gap-4 items-center">
            <Menu>
              <MenuButton
                as={Button}
                variant="primary"
                size="medium"
                tone="yellow"
                className="
                  font-bold
                  data-[open]:!bg-monokai-yellow
                  data-[open]:!text-monokai-gray-1000
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
                  overflow-y-auto
                  max-h-[300px]
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
                          onClick={()=>{
                            setCode(template.code)
                            refetchTemplates();
                            refetchStatisticData();
                          }}
                        >
                          {template.label}
                        </button>
                      </MenuItem>
                    );
                  })
                }
              </MenuItems>
            </Menu>
            <div className={` 
              relative
              transition-all duration-300 
              ${widthScale > 436 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
              ${widthScale <= 428 ? "hidden" : ""}
            `}
            >

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
                  data-[disabled=true]:!pointer-events-none
                "
                disabled={!fileName}
                data-disabled={!fileName}
                onClick={()=>{
                  onSaveClick(code, `${fileName}.ch`)();
                  setFileName("");
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
              <Menu>
                <MenuButton
                  as={Button}
                  variant="primary"
                  size="medium"
                  tone="yellow"
                  className="
                    font-bold whitespace-nowrap
                    data-[open]:!bg-monokai-yellow
                    data-[open]:!text-monokai-gray-1000
                  "
                >
                  View files
                </MenuButton>
                <MenuItems 
                  anchor="bottom start"
                  className="
                    mt-2
                    bg-monokai-gray-800 p-3
                    rounded divide-y-2 divide-monokai-gray-700
                    min-w-48
                    overflow-y-auto
                    max-h-[300px]
                  "
                >
                  {statisticData.length === 0 ? (
                    <MenuItem as="div">
                      <div className="text-monokai-gray-500 font-bold py-2">
                        No files uploaded
                      </div>
                    </MenuItem>
                  ) : (
                    statisticData.map((data, index) => {
                      const isXlsx = data.label.endsWith(".xlsx");
                      return (
                        <MenuItem 
                          as="div"
                          key={`${data.key}-${index}`} 
                        >
                          <button 
                            className="
                              cursor-pointer font-bold text-monokai-gray-500 
                              py-1 flex justify-between items-center
                            "
                            onClick={()=>{
                              if (isXlsx) {
                                showError("XLSX files are not supported yet");
                                return;
                              }
                              setCode(data.code)
                              refetchTemplates();
                              refetchStatisticData();
                            }}
                            type="button"
                          >
                            <span className="truncate">{data.label}</span>
                          </button>
                        </MenuItem>
                      );
                    })
                  )}
                </MenuItems>
              </Menu>
            </div>
            <div 
              className={`
                flex gap-4
                transition-all duration-300 
                ${widthScale > 707 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                ${widthScale <= 700 ? "hidden" : ""}
              `}
            >
              <FileInputForm onFileUpload={handleFileUpload} />
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <Button
                variant="primary-inverted"
                tone="green"
                size="large"
                className="data-[hover]:!text-monokai-green"
                onClick={onRunClick(code, files)}
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