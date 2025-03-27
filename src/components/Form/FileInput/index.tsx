'use client';

// import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

import Label from "../Label";
import Input from "../Input";

const FileInput = () => {
  const [ files, setFiles ] = useState<File[]>([]);

  const form = useFormContext();
  const { 
    setValue, 
  } = form;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files))
      setValue("files", Array.from(event.target.files));
    }
  };

  if (files.length>0) {
    return(
      <>

      </>
    );
  }

  return (
    <div>
      <Label htmlFor="file_input">Upload file:</Label>
      <Input
        type="file"
        className="
          w-full text-sm 
          cursor-pointer 
          bg-gray-100 
        "
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
