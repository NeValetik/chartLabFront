'use client'

import { FC, InputHTMLAttributes } from "react";
// import { useFormContext } from "react-hook-form";

import Label from "../Label";

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  error?:string;
  required?:boolean;
}

const InputBase: FC<InputBaseProps> = (props) => {
  const { type, className, ...rest } = props

  if ( type === "file" ){
    return (
      <div className="flex whitespace-nowrap flex-none">
        <Label className="text-monokai-gray-500 bg-monokai-gray-700 font-bold text-base py-2 pl-3 pr-1 rounded-l">
          Choose File 
        </Label>
        <input 
          type={type}
          hidden 
          className={`${className}`} 
          placeholder="" 
          // {...rest} 
        />
      </div>
    );
  }
  
  return <input {...props} />;
};

export default InputBase;