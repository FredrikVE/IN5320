// src/hooks/useDataSets.js
//hook for å utføre spørring på datasett
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataSetsQuery } from "../data/dataSetsQueries"

export function useDataSets() {
  const { data, loading, error } = useDataQuery(dataSetsQuery)

  useEffect(() => {
    if (data) {
      // skriver ut API-respons til consoll slik oppgaven ber om
      console.log("API-response", data);
    }
  }, [data]);

  const list = data?.dataSets?.dataSets ?? []

  return { loading, error, list } // returnerer data fra API
}
