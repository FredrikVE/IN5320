// src/components/Datasets.jsx
import React, { useState } from "react"
import { NoticeBox } from "@dhis2/ui"
import { useDataSets } from "../hooks/useDataSets"   // fra forrige steg
import DatasetsList from "./DatasetsList"
import DatasetDetailsTable from "./DatasetTable"
import styles from "../styles/datasets.module.css"

export default function Datasets() {
    const { loading, error, dataSets } = useDataSets()
    const [selectedId, setSelectedId] = useState(null)
    const selected = dataSets.find(d => d.id === selectedId) || null

    if (loading) return <span>Loading...</span>
    if (error)   return <span>ERROR: {error.message}</span>

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Datasets</h1>

            <div className={styles.split}>
                <aside className={`${styles.sidebar} ${styles.panel}`}>
                    <DatasetsList
                        dataSets={dataSets}
                        selectedId={selectedId}
                        onSelect={(ds) => setSelectedId(ds.id)}
                    />
                </aside>

                <section className={`${styles.content} ${styles.panel}`}>
                    {!selected ? (
                        <NoticeBox title="Velg et dataset">
                            Klikk et dataset i listen for å vise detaljer her.
                        </NoticeBox>
                    ) : (
                        <DatasetDetailsTable dataset={selected} />
                    )}
                </section>
            </div>
        </div>
    )
}
