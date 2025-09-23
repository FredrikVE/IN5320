// src/hooks/useDataElementsByDataSet.js
// Datahook for å hente dataelementer for API til "step 7"
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataElementsByDataSetQuery } from "../data/dataElementsByDataSetQuery"

export function useDataElementsByDataSet(dataSetId) {
    const queryOptions = { variables: { id: dataSetId}, lazy: true };
    const { data, loading, error, refetch } = useDataQuery(dataElementsByDataSetQuery, queryOptions);
    
    // Oppgaven: refetch når id endres
    useEffect(() => {
        if (dataSetId) {
            refetch({ id: dataSetId })
        }
    }, [dataSetId, refetch])
    
    const datasetElements = (data?.dataSet?.dataSetElements || []).map(dse => dse.dataElement)
    
    // Vis loader inntil første data finnes (enkelt å forstå i komponenten)
    const isLoading = loading && !data
    return { isLoading, error, datasetElements }
}
