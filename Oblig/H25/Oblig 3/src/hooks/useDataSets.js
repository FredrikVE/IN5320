// src/hooks/useDataSets.js
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataSetsQuery } from "../data/dataSetsQueries"

export function useDataSets() {
  const { data, loading, error } = useDataQuery(dataSetsQuery)

  // Oppgaven ber om å console.log() returdataene
  useEffect(() => {
    if (data) {
      // Merk: data.dataSets er API-svaret, som igjen har en "dataSets"-liste
      // dvs: arrayen ligger på data.dataSets.dataSets
      console.log("DHIS2 /dataSets response:", data)
    }
  }, [data])

  const list = data?.dataSets?.dataSets ?? []

  return { loading, error, list }
}
