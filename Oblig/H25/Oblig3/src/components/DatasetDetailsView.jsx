// src/components/DatasetDetailsView.jsx
import React from "react"
import { NoticeBox, CircularLoader } from "@dhis2/ui"
import { useDataElements } from "../hooks/useDataElements"
import DatasetMetadataTable from "./DatasetMetadataTable"
import DataElementsTable from "./DataElementsTable"

export default function DatasetDetailsView({ dataset }) {
  if (!dataset) return null

  const { loading, error, elements } = useDataElements(dataset.id)

  return (
    <div>
      {/* Tittel */}
      <h2 style={{ margin: "0 0 12px" }}>{dataset.displayName}</h2>

      {/* Metadata (Step 5) */}
      <DatasetMetadataTable dataset={dataset} />

      {/* Data elements (Step 7) */}
      <h3 style={{ margin: "16px 0 8px" }}>Data elements in dataset</h3>

      {error && <NoticeBox error title="Error">{error.message}</NoticeBox>}
      {loading && <CircularLoader />}
      {!loading && elements.length === 0 && (
        <NoticeBox>Dataset has no data elements.</NoticeBox>
      )}
      {elements.length > 0 && <DataElementsTable elements={elements} />}
    </div>
  )
}
