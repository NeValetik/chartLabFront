'use client';

import { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@/components/Button";
import { RiFileAddLine } from "@remixicon/react";
import { saveData } from "../../utils";
import { useNotification } from "@/contexts/NotificationContext";

interface FileInputFormProps {
  onFileUpload?: (file: File) => void;
}

const FileInputForm = ({ onFileUpload }: FileInputFormProps) => {
  const formMethods = useForm();
  const { handleSubmit, setValue } = formMethods;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useNotification();

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
    const resp = await saveData(data.file);
    console.log(resp);
    if (!!resp){
      showSuccess("File uploaded successfully", 5000);
    } else {
      showError("Error happened while uploading", 5000)
    }
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