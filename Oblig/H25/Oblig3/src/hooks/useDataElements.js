// src/hooks/useDataElements.js
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataElementsQuery as query } from "../datasource/dataElementsQuery"

export function useDataElements(dataSetId) {
    const { data, loading, error, refetch } = useDataQuery(query, {
        variables: { id: "" }, // dummy ved init
        lazy: true,
    })

    // Hent data når id endrer seg
    useEffect(() => {
        if (dataSetId) {
            refetch({ id: dataSetId }).catch(() => {})
        }
    }, [dataSetId, refetch])

    const elements = data?.dataSet?.dataSetElements ?? []

    return {
        loading,
        error,
        elements,
        hasData: elements.length > 0,
    }
}