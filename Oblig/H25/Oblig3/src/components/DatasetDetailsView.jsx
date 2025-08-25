// src/components/DatasetDetailsView.jsx
import { NoticeBox, CircularLoader } from "@dhis2/ui"
import { useDataElements } from "../hooks/useDataElements"
import DatasetMetadataTable from "./DatasetMetadataTable"
import DataElementsTable from "./DataElementsTable"

export default function DatasetDetailsView({ dataset }) {
    if (!dataset) return null
    const { loading, error, elements, hasData } = useDataElements(dataset.id)

    return (
        <div>
            <h2 style={{ margin: "0 0 12px" }}>{dataset.displayName}</h2>
            <DatasetMetadataTable dataset={dataset} />

            <h3 style={{ margin: "16px 0 8px" }}>Data elements in dataset</h3>
            {error && <NoticeBox error title="Error">{error.message}</NoticeBox>}
            {loading && <CircularLoader />}
            {!loading && !hasData && <NoticeBox>Dataset has no data elements.</NoticeBox>}
            {hasData && <DataElementsTable elements={elements} />}
        </div>
    )
}
