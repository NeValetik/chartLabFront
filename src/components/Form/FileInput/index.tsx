'use client';

import { FC, useState, ChangeEvent, InputHTMLAttributes, useRef, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../Label";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
}

const FileInput: FC<FileInputProps> = ({ 
  name,
  label = "Upload file:",
  placeholder = "No file selected",
  error,
  required = false,
  ...rest 
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const { setValue } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setValue(name, file, { shouldValidate: false });
    }
  };

  const handleClick = useCallback((e:any) => {
    inputRef.current?.click();
    e.preventDefault();  
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}{required && ' *'}</Label>}
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={handleFileChange}
        {...rest}
      />
      <button
        type="button"
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Choose File
      </button>
      <div className="text-sm text-gray-600 mt-1">
        {fileName || placeholder}
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default FileInput;
