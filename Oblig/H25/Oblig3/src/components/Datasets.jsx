// src/components/Datasets.jsx
import React, { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { dataSetsQuery } from "../datasource/dataSetsQuery"
import DatasetsList from "./DatasetsList"

export default function Datasets() {
    const { loading, error, data } = useDataQuery(dataSetsQuery)

    useEffect(() => {
        if (data) {
            console.log("API response:", data)
            console.log("dataSets array:", data?.dataSets?.dataSets)
        }
    }, [data])

    if (loading) return <span>Loading...</span>
    if (error) return <span>ERROR: {error.message}</span>

    // RIKTIG uthenting av arrayet:
    const dataSets = data?.dataSets?.dataSets ?? []

    return (
        <div>
            <h1>Datasets</h1>
            <p>Fant {dataSets.length} datasets.</p>

            <DatasetsList
                dataSets={dataSets}
                onSelect={(ds) => console.log("Valgt dataset:", ds)}
            />
        </div>
    )
}
