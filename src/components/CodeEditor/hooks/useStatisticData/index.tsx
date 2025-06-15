'use client'

import { useEffect, useState } from "react"
import { fetchStatisticData, fetchTemplates, StatisticDataResponse } from "../../utils"

interface UseStatisticDataProps {
  setCode: (code: string) => void;
}

export interface StatisticData {
  key: string;
  label: string;
  onClick: () => void;
  code: string;
}

const useStatisticData = ( { setCode }: UseStatisticDataProps ) => {
  const [ statisticData, setStatisticData ] = useState<StatisticData[]>([]);
  const [ refetch, setRefetch ] = useState(false);

  useEffect(()=>{
    const handleFetchTemplates = async() =>{
      const resp = await fetchStatisticData();
      if ( Array.isArray(resp) && resp.length > 0 ) {
        setStatisticData(
          resp.map((value) => ({
            key: value.key,
            label: value.label,
            onClick: () => setCode(value.code),
            code: value.code
          }))
        );
        return;
      }
      setStatisticData([{ key: "0", label: "empty", onClick: ()=>{}, code: "//There we go" }]);
    }
    handleFetchTemplates();
  }, [ setCode, refetch ])

  const handleRefetch = () => {
    setRefetch(!refetch);
  }
  
  return { statisticData, refetch: handleRefetch };
}

export default useStatisticData;
