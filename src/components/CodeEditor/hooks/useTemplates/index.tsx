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
      if ( Array.isArray(resp) && resp.length > 0 ) {
        setTemplates(
          resp.map((value) => ({
            key: value.key,
            label: value.label,
            onClick: () => setCode(value.code),
            code: value.code
          }))
        );
        return;
      }
      setTemplates([{ key: "0", label: "empty", onClick: ()=>{}, code: "//There we go" }]);
    }
    handleFetchTemplates();
    
  }, [ setCode ])
  
  return { templates };
}

export default useTemplates;
