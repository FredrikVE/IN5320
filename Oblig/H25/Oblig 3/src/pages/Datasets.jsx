// src/pages/Datasets.jsx
import { CircularLoader, NoticeBox } from "@dhis2/ui"
import { useDataSets } from "../hooks/useDataSets"

export default function Datasets() {
  const { loading, error, list } = useDataSets()

  if (loading) return <CircularLoader />
  if (error)   return <NoticeBox error title="Feil ved henting">{error.message}</NoticeBox>

  return (
    <div>
      <h1>Datasets</h1>
      <p>Antall datasett: <strong>{list.length}</strong></p>
      <p>(Selve dataene er logget i konsollen i henhold til oppgaveteksten.)</p>
    </div>
  )
}
