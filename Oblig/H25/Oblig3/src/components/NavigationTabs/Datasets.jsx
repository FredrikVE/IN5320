// src/components/Datasets.jsx
import { useEffect, useState } from "react"
import { NoticeBox } from "@dhis2/ui"
import { useDataSets } from "../../hooks/useDataSets"
import DatasetsList from "../DatasetsList"
import DataTable from "../Table/DataTable"
import styles from "../../styles/datasets.module.css"

export default function Datasets() {
    const { loading, error, dataSets } = useDataSets()
    const [selectedId, setSelectedId] = useState(null)

    // Velg første dataset automatisk når data er lastet
    useEffect(() => {
        if (!selectedId && dataSets.length) {
            setSelectedId(dataSets[0].id)
        }
    }, [dataSets, selectedId])

    if (loading) return <span>Loading...</span>
    if (error) return <span>ERROR: {error.message}</span>

    const selected = dataSets.find(d => d.id === selectedId) || null

    return (
        <>
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
                        <NoticeBox title="Select a dataset">
                            Choose a dataset from the list.
                        </NoticeBox>
                    ) : (
                        <DataTable dataset={selected} />
                    )}
                </section>
            </div>
        </>
    )
}
