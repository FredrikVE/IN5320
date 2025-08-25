// src/hooks/useDataElements.js
import { useEffect, useState } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataElementsQuery as query } from "../datasource/dataElementsQuery"

// Enkel cache i minnet på tvers av renders (per session)
const cache = new Map()

export function useDataElements(dataSetId) {
    const [fromCache, setFromCache] = useState(() => cache.get(dataSetId) || null)
    const skipNetwork = !dataSetId || !!fromCache

    const { data, loading, error, refetch } = useDataQuery(query, {
        variables: { id: dataSetId || "" },
        lazy: skipNetwork, // ikke slå mot API hvis vi allerede har cache eller mangler id
    })

    // Når id endrer seg: prøv cache først, ellers trigge refetch
    useEffect(() => {
        if (!dataSetId) {
            setFromCache(null)
            return
        }
        const cached = cache.get(dataSetId)
        if (cached) {
            setFromCache(cached)
            return
        }
        setFromCache(null) // unngå å vise gamle elementer mens vi henter nye
        refetch({ id: dataSetId }).catch(() => {})
    }, [dataSetId, refetch])

    // Når vi får nye data: legg i cache og oppdater state
    useEffect(() => {
        if (dataSetId && data?.dataSet && !cache.has(dataSetId)) {
            cache.set(dataSetId, data.dataSet)
            setFromCache(data.dataSet)
        }
    }, [data, dataSetId])

    const elements =
        fromCache?.dataSetElements ??
        data?.dataSet?.dataSetElements ??
        []

    return {
        loading: skipNetwork ? false : loading,
        error,
        elements,
        hasData: elements.length > 0,
    }
}
