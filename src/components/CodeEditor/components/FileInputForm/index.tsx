'use client';

import { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@/components/Button";
import { RiFileAddLine } from "@remixicon/react";
import { saveData } from "../../utils";

interface FileInputFormProps {
  onFileUpload?: (file: File) => void;
}

const FileInputForm = ({ onFileUpload }: FileInputFormProps) => {
  const formMethods = useForm();
  const { handleSubmit, setValue } = formMethods;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("file", file);
      onFileUpload?.(file);
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data: any) => {
    console.log("Submitted file:", data.file);
    await saveData(data.file);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="button"
          variant="primary"
          size="medium"
          tone="yellow"
          className="font-bold whitespace-nowrap"
          onClick={handleButtonClick}
        >
          <RiFileAddLine className="w-5 h-5" />
          <span>Upload File</span>
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept="*/*"
        />
      </form>
    </FormProvider>
  );
};

export default FileInputForm;