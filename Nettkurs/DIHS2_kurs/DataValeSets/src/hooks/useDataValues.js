// src/hooks/useDataValues.js
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataValueSetsQuery } from "../data/dataValueSetsQuery"

export function useDataValues(dataSetId, orgUnitId, period) {
    const queryOptions = { variables: { dataSetId, orgUnitId, period }, lazy: true }
    const { data, loading, error, refetch } = useDataQuery(dataValueSetsQuery, queryOptions)

    useEffect(() => {
        if (dataSetId && orgUnitId && period) {
            refetch({ dataSetId, orgUnitId, period })
        }
    }, [dataSetId, orgUnitId, period, refetch])

    const values = data?.dataValueSets?.dataValues ?? []
    return { loading, error, values }
}
