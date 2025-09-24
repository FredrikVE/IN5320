// src/hooks/useDataSetOrgUnits.js
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataSetOrgUnitsQuery } from "../data/dataSetOrgUnitsQuery"

export function useDataSetOrgUnits(dataSetId) {
  const { data, loading, error, refetch } = useDataQuery(
    dataSetOrgUnitsQuery,
    { variables: { dataSetId }, lazy: true }
  )

  useEffect(() => {
    if (dataSetId) refetch({ dataSetId })
  }, [dataSetId, refetch])

  const orgUnits = data?.dataSet?.organisationUnits ?? []
  return { loading, error, orgUnits }
}
