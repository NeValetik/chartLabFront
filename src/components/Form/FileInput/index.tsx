'use client';

// import { FC } from "react";
import { useState, useRef, useCallback, ChangeEvent, InputHTMLAttributes, FC } from "react";
import { useFormContext } from "react-hook-form";

import Label from "../Label";
import Input from "../Input";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?:string;
  required?:boolean;
}

const FileInput: FC<FileInputProps> = ( props ) => {
  const { 
    placeholder = "file",
    error,
    required, 
    ...rest 
  } = props 
  const [ fileName, setFileName ] = useState<string | null>();

  const form = useFormContext();
  const { 
    setValue, 
  } = form;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[ 0 ];
    if ( file ) {
      setFileName(file.name)
      setValue("files", file);
    }
  };

  const ref = useRef<HTMLInputElement>( null );

  const handleClick = useCallback(
    () => {
      if ( ref.current ) {
        ref.current.click();
      }
    },
    [ ref ],
  );

  return (
    <div>
      <Label>Upload file:</Label>
      <input
        type="file"
        hidden 
        className="" 
        placeholder="" 
        onChange={handleFileChange}
      />
      <div
        className="text-md text-[#64748B] grow select-none"
      >
        { fileName ? (
          <div>
            { fileName }
          </div>
        ) : (
          <div>
            { placeholder }
          </div>
        ) }
      </div>
    </div>
  );
};

export default FileInput;
