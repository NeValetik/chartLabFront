'use client';

// import { FC } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../Label";
import Input from "../Input";

export interface DropzoneDefaultValues {
  files: File[];
}

const FileInput = () => {
  const form = useFormContext();
  const { 
    setValue, 
    // handleSubmit 
  } = form;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setValue("files", Array.from(event.target.files));
    }
  };

  return (
    <div>
      <Label htmlFor="file_input">Upload file</Label>
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
