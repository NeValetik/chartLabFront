'use client'

import { useEffect, useState, FC } from "react"
import { fetchTemplates } from "../../utils"
import { Template } from "../.."

interface UseTemplatesProps {
  setCode: (code: string) => void;
}


const useTemplates = ( { setCode }: UseTemplatesProps ) => {
  const [ templates, setTemplates ] = useState<Template[]>([]);

  useEffect(()=>{
    const handleFetchTemplates = async() =>{
      const resp = await fetchTemplates();
      if ( resp ) {
        setTemplates(
          resp.map((value) => ({
            key: value.key,
            label: value.label,
            onClick: () => setCode(value.code), // Fix: Pass function reference
          }))
        );
        return;
      }
      setTemplates([{ key: "0", label: "empty", onClick: ()=>{} }]);
    }
    handleFetchTemplates();
    
  }, [])
  
  return templates;
}

export default useTemplates;
