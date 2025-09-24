import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataElementsByDataSetQuery } from "../data/dataElementsByDataSetQuery"

export function useDataElementsByDataSet(dataSetId) {
  const { data, loading, error, refetch } = useDataQuery(
    dataElementsByDataSetQuery,
    { variables: { dataSetId }, lazy: true }
  )

  useEffect(() => { 
    if (dataSetId) {
        refetch({ dataSetId }) }
    }, 
    [dataSetId, refetch])

  const datasetElements = (data?.dataSet?.dataSetElements || []).map(d => d.dataElement)
  return { loading, error, datasetElements }
}
