import { useState, useEffect } from "react"
import { CircularLoader, NoticeBox, Card, SingleSelect, SingleSelectOption } from "@dhis2/ui"
import { useDataSets } from "../hooks/useDataSets"
import DatasetsList from "../components/DatasetsList"
import GeneralDatasetInfoTable from "../components/GeneralDatasetInfoTable"
import ElementsInDataSetTable from "../components/ElementsInDataSetTable"

export default function Datasets() {
  const { loading, error, list } = useDataSets();
  const [selected, setSelected] = useState(null);
  const [orgUnitId, setOrgUnitId] = useState("ImspTQPwCqd"); // Sierra Leone default
  const [period, setPeriod] = useState("202209"); // September 2022 default

  useEffect(() => {
    if (!selected && list.length) {
      setSelected(list[0])
    }
  }, [list]);

  if (loading) return <CircularLoader />;
  if (error) return <NoticeBox error title="Feil ved henting">{error.message}</NoticeBox>;

  return (
    <div>
      <h1>Datasets</h1>
      <div className="layout">
        <div className="leftPane">
          <Card>
            <DatasetsList
              items={list}
              selectedId={selected?.id ?? null}
              onSelect={setSelected}
            />
          </Card>
        </div>

        <div className="rightPane">
          <Card className="general-dataset-information">
            <h2>General dataset information</h2>
            {selected && <GeneralDatasetInfoTable dataset={selected} />}

            <div style={{ marginTop: 16 }}>
              <SingleSelect selected={orgUnitId} onChange={({ selected }) => setOrgUnitId(selected)} label="Organisation unit">
                <SingleSelectOption label="Sierra Leone" value="ImspTQPwCqd" />
                <SingleSelectOption label="Bo District" value="qOdWr69J2Cr" />
              </SingleSelect>
              <SingleSelect selected={period} onChange={({ selected }) => setPeriod(selected)} label="Period">
                <SingleSelectOption label="September 2022" value="202209" />
                <SingleSelectOption label="October 2022" value="202210" />
              </SingleSelect>
            </div>
          </Card>

          <Card className="dataset-content">
            <h2>Elements in dataset</h2>
            {selected && <ElementsInDataSetTable dataSetId={selected.id} orgUnitId={orgUnitId} period={period} />}
          </Card>
        </div>
      </div>
    </div>
  );
}
