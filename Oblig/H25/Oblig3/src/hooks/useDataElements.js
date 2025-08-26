// src/hooks/useDataElements.js
import { useEffect, useMemo } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataElementsQuery as query } from "../datasource/dataElementsQuery"
import { sortElements } from "../utils/sortElements"

export function useDataElements(dataSetId) {
    const { data, loading, error, refetch } = useDataQuery(query, {
        variables: { id: "" }, // dummy ved init
        lazy: true,            // alltid lazy
    })

    // Hent data når id endrer seg
    useEffect(() => {
        if (dataSetId) {
            refetch({ id: dataSetId }).catch(() => {})
        }
    }, [dataSetId, refetch])

    const elements = useMemo(function () {
        return sortElements(data)
    }, [data])

    return {
        loading,
        error,
        elements,
        hasData: elements.length > 0,
    }
}
