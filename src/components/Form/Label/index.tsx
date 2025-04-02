'use client'

import { FC, LabelHTMLAttributes } from "react";
// import { useFormContext } from "react-hook-form";

interface LabelBaseProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  className?: string;
}

const LabelBase: FC<LabelBaseProps> = (props) => {
  // const form = useFormContext();
  const {
    className, 
    ...rest
  } = props;

  return( 
    <label 
      className={`font-bold text-monokai-gray-100 ${className}`} 
      {...rest} 
    />
  );
};

export default LabelBase;