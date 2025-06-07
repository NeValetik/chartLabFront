'use client';

import { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import FileInput from "@/components/Form/FileInput";
import { RiFileAddLine } from "@remixicon/react";
import { useForm, FormProvider } from "react-hook-form";
import { saveData } from "../../utils";

const FileInputForm = () => {
  const form = useForm();
  const { handleSubmit, formState: { errors } } = form;

  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: any) => {
    console.log("Submitted file:", data.file);
    await saveData(data);
    setOpen(false); // Close dropdown after upload
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      
      {open && (
        <div
          ref={menuRef}
          className="
          absolute left-0 mt-1 z-50
          bg-monokai-gray-800 p-3
          rounded border-monokai-gray-1000 border
          space-y-2
          min-w-[250px]
          "
          >
          <div>
            <FileInput name="file"/>
          </div>
          <div>
            <Button type="submit">
              Upload
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FileInputForm;
