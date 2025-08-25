// src/hooks/useDataElements.js
import { useEffect, useState } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataElementsQuery as query } from "../datasource/dataElementsQuery"

const cache = new Map()
export const clearDataElementsCache = () => cache.clear()

export function useDataElements(dataSetId) {
  const [fromCache, setFromCache] = useState(() => cache.get(dataSetId) || null)
  const skipNetwork = !dataSetId || !!fromCache

  const { data, loading, error, refetch } = useDataQuery(query, {
    variables: { id: dataSetId || "" },
    lazy: skipNetwork,
  })

  useEffect(() => {
    if (!dataSetId) { setFromCache(null); return }
    const hit = cache.get(dataSetId)
    if (hit) { setFromCache(hit); return }
    setFromCache(null)
    refetch({ id: dataSetId }).catch(() => {})
  }, [dataSetId, refetch])

  // Cache under id-en fra responsen (sikrer riktig nøkkel)
  useEffect(() => {
    const ds = data?.dataSet
    const respId = ds?.id
    if (respId && !cache.has(respId)) {
      cache.set(respId, ds)
      if (respId === dataSetId) setFromCache(ds)
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
