'use client'

import { useState, memo, FC, useEffect } from "react";
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
  
  // useEffect(() => {
  //   import('monaco-editor').then((monaco) => {
  //     // Use monaco here
  //     monaco.languages.register({ id: 'custom-lang' });
  //     monaco.languages.setMonarchTokensProvider('custom-lang', {
  //       tokenizer: {
  //         root: [
  //           [/\b(start|end|run)\b/, 'keyword'],
  //           [/\b([a-zA-Z_][\w]*)\s*\(/, 'function'],
  //           [/\b([a-zA-Z_][\w]*)\b/, 'variable'],
  //           [/\b\d+\b/, 'number'],
  //           [/'[^']*'/, 'string'],
  //         ]
  //       }
  //     });
  
  //     monaco.editor.defineTheme('custom-theme', {
  //       base: 'vs-dark',
  //       inherit: true,
  //       rules: [
  //         { token: 'keyword', foreground: 'blue' },
  //         { token: 'function', foreground: 'red' },
  //         { token: 'variable', foreground: 'white' },
  //         { token: 'number', foreground: 'green' },
  //         { token: 'string', foreground: 'yellow' },
  //       ],
  //       colors: {
  //         'editor.background': '#2d2d2d',
  //         'editor.foreground': '#ffffff',
  //       }
  //     });
  
  //     monaco.editor.setTheme('custom-theme');
  //   });
  // }, []);

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
      <div className="flex justify-between bg-[#383838] px-3 py-1">
        <Menu>
          <MenuButton
            className="
              rounded 
              transition-colors
              flex justify-center items-center 
              cursor-pointer
              gap-1
              data-[hover]:bg-monokai-green
              data-[hover]:data-[active]:bg-monokai-green
              bg-monokai-gray-800
              text-monokai-gray-500
              data-[hover]:text-monokai-gray-1000
              py-2 px-4 
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
          <Button
            variant="primary-inverted"
            tone="red"
            size="medium"
            className="rounded-full"
            onClick={onRunClick(code)}
          >
            <RiPlayLargeFill
              size={16} 
              className="h-4 w-4"
            />
          </Button>
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