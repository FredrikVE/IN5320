// src/pages/Browse.jsx
import { useState, useEffect, useMemo } from "react"
import {
  Card, CircularLoader, NoticeBox,
  SingleSelect, SingleSelectOption, InputField,
} from "@dhis2/ui"
import { useDataQuery } from "@dhis2/app-runtime"
import { useDataSets } from "../hooks/useDataSets"
import { useDataSetOrgUnits } from "../hooks/useDataSetOrgUnits"
import DatasetsList from "../components/DatasetsList"
import GeneralDatasetInfoTable from "../components/GeneralDatasetInfoTable"
import ElementsInDataSetTable from "../components/ElementsInDataSetTable"

// Hent orgUnits (id + navn) med paging
const orgUnitsQuery = {
  orgUnits: {
    resource: "organisationUnits",
    params: {
      fields: ["id", "displayName"],
      pageSize: 500,
      order: "asc:displayName",
    },
  },
}

// yyyyMM for nåværende måned
function getCurrentMonthPeriod() {
  const d = new Date()
  const y = String(d.getFullYear())
  const m = String(d.getMonth() + 1).padStart(2, "0")
  return `${y}${m}`
}

export default function Browse() {
  const { loading, error, list } = useDataSets()
  const [selectedDataset, setSelectedDataset] = useState(null)

  // Alle OU'er (for label-oppslag)
  const { data: ouData, loading: ouLoading, error: ouError } = useDataQuery(orgUnitsQuery)
  const allOrgUnits = useMemo(
    () => ouData?.orgUnits?.organisationUnits ?? [],
    [ouData]
  )

  // OU'er som datasettet faktisk er tilknyttet
  const { orgUnits: dsOrgUnits, loading: dsOuLoading, error: dsOuError } =
    useDataSetOrgUnits(selectedDataset?.id)

  // Valg
  const [selectedOrgUnitId, setSelectedOrgUnitId] = useState("")
  const [period, setPeriod] = useState(getCurrentMonthPeriod())

  // Sett første dataset når klart
  useEffect(() => {
    if (!selectedDataset && list.length) setSelectedDataset(list[0])
  }, [list, selectedDataset])

  // Når vi har dsOrgUnits, sørg for at valgt OU er gyldig for datasettet
  useEffect(() => {
    if (!dsOrgUnits?.length) return
    const ids = new Set(dsOrgUnits.map(o => o.id))
    if (!selectedOrgUnitId || !ids.has(selectedOrgUnitId)) {
      setSelectedOrgUnitId(dsOrgUnits[0].id)
    }
  }, [dsOrgUnits, selectedOrgUnitId])

  // Lag en map id -> displayName så vi kan vise pene labels
  const ouNameById = useMemo(() => {
    const m = new Map(allOrgUnits.map(o => [o.id, o.displayName]))
    // fallback for dsOrgUnits som ikke er i allOrgUnits-responsen
    dsOrgUnits?.forEach(o => { if (!m.has(o.id)) m.set(o.id, o.displayName) })
    return m
  }, [allOrgUnits, dsOrgUnits])

  if (loading || ouLoading || dsOuLoading) return <CircularLoader />
  if (error)     return <NoticeBox error title="Feil ved henting">{error.message}</NoticeBox>
  if (ouError)   return <NoticeBox error title="Feil ved henting av orgUnits">{ouError.message}</NoticeBox>
  if (dsOuError) return <NoticeBox error title="Feil ved dataset-OU">{dsOuError.message}</NoticeBox>

  // OU-lista som faktisk er assignet til datasettet
  const selectableOrgUnits = dsOrgUnits ?? []

  return (
    <div>
      <h1>Browse</h1>
      <div className="layout">
        <div className="leftPane">
          <Card>
            <DatasetsList
              items={list}
              selectedId={selectedDataset?.id ?? null}
              onSelect={(ds) => setSelectedDataset(ds)}
            />
          </Card>
        </div>

        <div className="rightPane">
          {selectedDataset && (
            <>
              <Card className="general-dataset-information">
                <h2>General dataset information</h2>
                <GeneralDatasetInfoTable dataset={selectedDataset} />
              </Card>

              <Card className="dataset-content">
                <h2>Filter</h2>
                <div className="filter">
                  <div className="filter__ou">
                    <label className="filter__label">Organisation unit</label>
                    {selectableOrgUnits.length ? (
                      <SingleSelect
                        selected={selectedOrgUnitId}
                        onChange={({ selected }) => setSelectedOrgUnitId(selected)}
                        prefix="OU"
                      >
                        {selectableOrgUnits.map(ou => (
                          <SingleSelectOption
                            key={ou.id}
                            value={ou.id}
                            label={ouNameById.get(ou.id) ?? ou.displayName}
                          />
                        ))}
                      </SingleSelect>
                    ) : (
                      <NoticeBox title="Datasettet er ikke tilknyttet noen orgUnits">
                        Velg et annet datasett.
                      </NoticeBox>
                    )}
                  </div>

                  <div className="filter__period">
                    <InputField
                      label="Period (yyyyMM)"
                      helpText="Eks: 202209 for september 2022"
                      value={period}
                      onChange={({ value }) => setPeriod(value)}
                      placeholder="yyyyMM"
                    />
                  </div>
                </div>
              </Card>

              <Card className="dataset-content">
                <h2>Elements with values</h2>
                <ElementsInDataSetTable
                  dataSetId={selectedDataset.id}
                  orgUnitId={selectedOrgUnitId}
                  period={period}
                />
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
