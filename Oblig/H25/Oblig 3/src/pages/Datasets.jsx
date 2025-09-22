// src/pages/Datasets.jsx
import { useState, useEffect } from "react"
import { CircularLoader, NoticeBox, Card } from "@dhis2/ui"
import { useDataSets } from "../hooks/useDataSets"
import DatasetsList from "../components/DatasetsList"
import DatasetDetailsTable from "../components/DatasetDetailsTable"
import DataElementsTable from "../components/DataElementsTable"

export default function Datasets() {
  const { loading, error, list } = useDataSets();
  const [ selected, setSelected ] = useState(null);

  // autovelg første når lista er klar
  useEffect(() => {
    if (!selected && list.length) {
      setSelected(list[0])
    }
  }, [list, selected]);

  if (loading) { 
    return <CircularLoader /> 
  };

  if (error) {
    return <NoticeBox error title="Feil ved henting">{error.message}</NoticeBox>
  };

  return (
    <div>
      <h1>Datasets</h1>

      <div className="layout">
        <div className="leftPane">
          <Card>
            <DatasetsList
              items={list}
              selectedId={selected?.id ?? null}
              onSelect={(dataset) => setSelected(dataset)}
            />
          </Card>
        </div>

        <div className="rightPane">
          <Card className="general-dataset-information">
            <h2>General dataset information</h2>
            {selected && <DatasetDetailsTable dataset={selected} />}
          </Card>

          <Card className="dataset-content">
            <h2>Elements in dataset</h2>
            {selected && <DataElementsTable dataSetId={selected.id} />}
          </Card>
        </div>



      </div>
    </div>
  );
}
