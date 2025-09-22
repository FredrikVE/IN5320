// src/pages/Datasets.jsx
import { useState, useEffect } from "react"
import { CircularLoader, NoticeBox, Card } from "@dhis2/ui"
import { useDataSets } from "../hooks/useDataSets"
import DatasetsList from "../components/DatasetsList"
import DatasetDetailsTable from "../components/DatasetDetailsTable"

export default function Datasets() {
  const { loading, error, list } = useDataSets()
  const [selectedId, setSelectedId] = useState(null)

  // Auto-velg første dataset når lista er klar
  useEffect(() => {
    if (!selectedId && list.length) {
      setSelectedId(list[0].id)
    }
  }, [list, selectedId])

  if (loading){
    return <CircularLoader />
  }

  if (error) {
    return <NoticeBox error title="Feil ved henting">{error.message}</NoticeBox>
  }

  const selected = list.find(d => d.id === selectedId) || null

  return (
    <div>
      <h1>Datasets</h1>

      <div className="layout">
        <div className="leftPane">
          <Card>
            <div className="cardBody">
              <DatasetsList
                items={list}
                selectedId={selectedId}
                onSelect={(ds) => setSelectedId(ds.id)}
              />
            </div>
          </Card>
        </div>

        <div className="rightPane">
          <Card>
            <div className="cardBody">
              <DatasetDetailsTable dataset={selected} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
