//src/pages/Browse.jsx
import { useState, useEffect } from "react"
import { Card, CircularLoader, NoticeBox } from "@dhis2/ui"
import { useDataSets } from "../hooks/useDataSets"
import DatasetsList from "../components/DatasetsList"
import GeneralDatasetInfoTable from "../components/GeneralDatasetInfoTable"
import ElementsInDataSetTable from "../components/ElementsInDataSetTable"

export default function Browse() {
  const { loading, error, list } = useDataSets()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!selected && list.length) setSelected(list[0])
  }, [list, selected])

  if (loading) return <CircularLoader />
  if (error)   return <NoticeBox error title="Feil ved henting">{error.message}</NoticeBox>

  return (
    <div>
      <h1>Browse</h1>
      <div className="layout">
        <div className="leftPane">
          <Card>
            <DatasetsList
              items={list}
              selectedId={selected?.id ?? null}
              onSelect={(ds) => setSelected(ds)}
            />
          </Card>
        </div>

        <div className="rightPane">
          {selected && (
            <>
              <Card className="general-dataset-information">
                <h2>General dataset information</h2>
                <GeneralDatasetInfoTable dataset={selected} />
              </Card>

              <Card className="dataset-content">
                <h2>Elements with values</h2>
                <ElementsInDataSetTable dataSetId={selected.id} />
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
