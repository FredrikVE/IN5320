//src/hooks/useDataSets.js
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataSetsQuery } from "../data/dataSetsQuery"

export function useDataSets() {
  const { data, loading, error } = useDataQuery(dataSetsQuery)

  useEffect(() => { 
    if (data) { 
      console.log("Datasets:", data)
    }
  }, [data])

  const list = data?.dataSets?.dataSets ?? []
  return { loading, error, list }
}
