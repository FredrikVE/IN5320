// src/hooks/useDataSets.js
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataSetsQuery } from "../datasource/dataSetsQuery"

export function useDataSets() {
    const { loading, error, data } = useDataQuery(dataSetsQuery)

    useEffect(() => {
        if (data) console.log("API response:", data)
    }, [data])

    return {
        loading,
        error,
        dataSets: data?.dataSets?.dataSets ?? [],
    }
}
