// src/pages/Datasets.jsx
import { useState } from "react"
//import { CircularLoader, NoticeBox, Card, CardBody } from "@dhis2/ui"
import { CircularLoader, NoticeBox, Card } from "@dhis2/ui"
import { useDataSets } from "../hooks/useDataSets"
import DatasetsList from "../components/DatasetsList"
import DatasetDetailsTable from "../components/DatasetDetailsTable"

export default function Datasets() {
  const { loading, error, list } = useDataSets()
  const [selectedId, setSelectedId] = useState(null)

  if (loading) return <CircularLoader />
  if (error)   return <NoticeBox error title="Feil ved henting">{error.message}</NoticeBox>

  const selected = list.find(d => d.id === selectedId) || null

  return (
    <>
      <h1>Datasets</h1>

      <div className="split">
        <aside className="sidebar">
          <Card>

              <DatasetsList
                items={list}
                selectedId={selectedId}
                onSelect={(ds) => setSelectedId(ds.id)}
              />

          </Card>
        </aside>

        <section className="content">
          <Card>
         
              {!selected ? (
                <NoticeBox title="Velg et dataset">
                  Klikk i listen til venstre for å vise detaljer.
                </NoticeBox>
              ) : (
                <DatasetDetailsTable dataset={selected} />
              )}
    
          </Card>
        </section>
      </div>
    </>
  )
}
