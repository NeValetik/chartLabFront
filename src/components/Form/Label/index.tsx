'use client'

import { FC, LabelHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface LabelBaseProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const LabelBase: FC<LabelBaseProps> = (props) => {
  const form = useFormContext();

  return <label {...props} />;
};

export default LabelBase;