'use client';

import { Fragment } from "react";
import Button from "@/components/Button";
import FileInput from "@/components/Form/FileInput"; // Assuming this is the headless UI version from the previous step
import { RiFileAddLine } from "@remixicon/react";
import { useForm, FormProvider } from "react-hook-form";
import { saveData } from "../../utils";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";

const FileInputForm = () => {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const onSubmit = async (data: any) => {
    // When using a popover, you might want to close it after submission.
    // The 'close' function is available from the Popover render prop.
    console.log("Submitted file:", data.file);
    await saveData(data);
    // The popover can be programmatically closed if needed, see notes below.
  };

  return (
    // Use FormProvider to pass down form context to nested components like FileInput
    <FormProvider {...formMethods}>
      {/* The 'form' element now wraps the Popover and handles the submission */}
      <form onSubmit={handleSubmit(onSubmit)} className="relative inline-block text-left">
        <Popover>
          {({ open, close }) => (
            <>
              {/* This is the button that toggles the popover's visibility */}
              <PopoverButton 
                as={Button} 
                variant="primary" 
                tone="yellow"
                className="text-base font-bold whitespace-nowrap"
              >
                <RiFileAddLine className="w-5 h-5" />
                <span>Upload File</span>
              </PopoverButton>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                {/* This panel contains the form content */}
                <PopoverPanel
                  className="
                    absolute left-0 mt-2 z-50
                    bg-monokai-gray-800 p-4
                    rounded-md border-monokai-gray-1000 border
                    shadow-lg w-72 space-y-4
                  "
                >
                  <div className="flex flex-col gap-4">
                    <FileInput
                      name="file"
                      label="Select a file to upload"
                      // You can add validation rules here via react-hook-form's register
                      // For example, in the FileInput component if you spread `register(name, { required: 'File is required' })`
                    />
                    
                    <Button
                      type="submit"
                      variant="primary"
                      tone="green"
                      onClick={async () => {
                        // We trigger the submit, and if successful, we close the panel.
                        const isValid = await formMethods.trigger();
                        if (isValid) {
                          // The handleSubmit(onSubmit) will be called by the form's onSubmit
                          // We can close the popover after the form is submitted.
                          // To do this, we'd modify onSubmit to accept 'close'
                          handleSubmit((data) => {
                            onSubmit(data);
                            close();
                          })();
                        }
                      }}
                    >
                      Upload
                    </Button>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </form>
    </FormProvider>
  );
};

export default FileInputForm;