// src/hooks/useDataElementsByDataSet.js
// Datahook for å hente dataelementer for API til "step 7"
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataElementsByDataSetQuery } from "../data/dataElementsByDataSetQuery"

export function useDataElementsByDataSet(dataSetId) {
    const queryOptions = { variables: { id: dataSetId}, lazy: true };
    const { data, loading, error, refetch } = useDataQuery(dataElementsByDataSetQuery, queryOptions);
    
    // step 7: refetch når id endres pga velding av nytt datasett i margen
    useEffect(() => {
        if (dataSetId) {
            refetch({ id: dataSetId })
        }
    }, [dataSetId, refetch])
    
    // nullsjekk og tom standardliste for å håndtere lazy/første render
    const datasetElements = (data?.dataSet?.dataSetElements || []).map(dse => dse.dataElement)
        
    return { loading, error, datasetElements }
}
