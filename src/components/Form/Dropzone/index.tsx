// 'use client'

// import { FC } from "react";
// import { useDropzone } from "react-dropzone";
// import { useFormContext } from "react-hook-form";

// export interface DropzoneDefaultValues{
//   files: File[];
// }

// const Dropzone: FC<
//   {
//     onSubmit: () => void;
//   }
// > = ({ onSubmit }) => {
//   const form = useFormContext();
//   const { 
//     setValue,
//     handleSubmit 
//   } = form;

//   const { getRootProps, getInputProps } = useDropzone();

//   const handleAddFile = (name: string) => (value:DropzoneDefaultValues)  => {
//     setValue(name, value);
//   };

//   return(
//     // <form onSubmit={handleSubmit( onSubmit )}>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <div className="flex items-center justify-center w-full">
//           <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                       <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                   </svg>
//                   <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
//                   <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//               </div>
//               <input id="dropzone-file" type="file" class="hidden" />
//           </label>
//         </div> 
//       </div>
//     // </form>
//   );
// }

// export default Dropzone;