// src/pages/Datasets.jsx
import { CircularLoader, NoticeBox } from "@dhis2/ui"
import { useState } from "react"
import { useDataSets } from "../hooks/useDataSets"
import DatasetsList from "../components/DatasetsList"

export default function Datasets() {
  const { loading, error, list } = useDataSets()
  const [selectedId, setSelectedId] = useState(null)

  if (loading) return <CircularLoader />
  if (error)   return <NoticeBox error title="Feil ved henting">{error.message}</NoticeBox>

  return (
    <div>
      <h1>Datasets</h1>
      <DatasetsList
        items={list}
        selectedId={selectedId}
        onSelect={(ds) => setSelectedId(ds.id)}
      />
    </div>
  )
}
