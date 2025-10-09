//src/hooks/useDataElementsByDataSet.js
// Datahook for å hente dataelementer for API til "step 7"
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataElementsByDataSetQuery } from "../data/dataElementsByDataSetQuery"

export function useDataElementsByDataSet(dataSetId) {
    const queryOptions = { variables: { id: dataSetId}, lazy: true };
    const { data, loading, error, refetch } = useDataQuery(dataElementsByDataSetQuery, queryOptions);
    
    // step 7: useEffect som refetcher når id endres pga valg av nytt datasett i marg-menyen
    useEffect(() => {
        if (dataSetId) {
            refetch({ id: dataSetId });
        }
    }, [dataSetId, refetch]);
    
    // nullsjekk og tom standardliste for å håndtere lazy/første render
    const datasetElements = (data?.dataSet?.dataSetElements || []).map(
        dataset => dataset.dataElement
    );
        
    return { loading, error, datasetElements }; // Returerer objekt-litteral med tilstander for data, loading og error
}
