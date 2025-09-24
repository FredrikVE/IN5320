// src/components/ElementsInDataSetTable.jsx
import React, { useEffect } from "react"
import {
  Table, TableHead, TableRowHead, TableCellHead,
  TableBody, TableRow, TableCell, NoticeBox, CircularLoader,
} from "@dhis2/ui"
import { useDataQuery } from "@dhis2/app-runtime"
import { useDataElementsByDataSet } from "../hooks/useDataElementsByDataSet"
import { dataValuesQuery } from "../data/dataValuesQuery"

export default function ElementsInDataSetTable({ dataSetId, orgUnitId, period }) {
  const { loading, error, datasetElements } = useDataElementsByDataSet(dataSetId)

  // Hent dataValueSets KUN når alle variabler er klare
  const {
    data: dataValues,
    loading: dvsLoading,
    error: dvsError,
    refetch,
  } = useDataQuery(dataValuesQuery, { lazy: true })

  const ready = Boolean(dataSetId && orgUnitId && period)

  useEffect(() => {
    if (ready) {
      refetch({ dataSet: dataSetId, orgUnit: orgUnitId, period, children: true })
    }
  }, [ready, dataSetId, orgUnitId, period, refetch])

  if (!ready) {
    return (
      <NoticeBox title="Velg filter">
        Velg både organisation unit og period for å hente verdier.
      </NoticeBox>
    )
  }

  if (loading || dvsLoading) return <CircularLoader />
  if (error || dvsError) {
    return (
      <NoticeBox error title="Kunne ikke hente data">
        {error?.message || dvsError?.message}
      </NoticeBox>
    )
  }

  if (!datasetElements.length) {
    return (
      <NoticeBox title="Ingen dataelementer">
        Dette datasettet har ingen elementer.
      </NoticeBox>
    )
  }

  // Ingen verdier i responsen
  if (!dataValues?.dvs?.dataValues?.length) {
    return (
      <NoticeBox title={`Ingen verdier for ${period}`}>
        Ingen dataValues funnet for valgt dataset, org unit (inkl. underenheter) og periode.
        Prøv en annen periode eller org unit.
      </NoticeBox>
    )
  }

  // Oppslag: { dataElementId: value }
  const valuesByDeId = Object.fromEntries(
    (dataValues?.dvs?.dataValues ?? []).map(v => [v.dataElement, v.value])
  )

  return (
    <Table>
      <TableHead>
        <TableRowHead>
          <TableCellHead>Display name</TableCellHead>
          <TableCellHead>Verdi ({period})</TableCellHead>
          <TableCellHead>ID</TableCellHead>
          <TableCellHead>Created</TableCellHead>
        </TableRowHead>
      </TableHead>
      <TableBody>
        {datasetElements.map(el => (
          <TableRow key={el.id}>
            <TableCell>{el.displayName}</TableCell>
            <TableCell>{valuesByDeId[el.id] ?? "—"}</TableCell>
            <TableCell>{el.id}</TableCell>
            <TableCell>{new Date(el.created).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
