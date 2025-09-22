// src/components/DataElementsTable.jsx
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, CircularLoader } from "@dhis2/ui"
import { dataElementsByDataSetQuery } from "../data/dataElementsByDataSetQuery"

export default function DataElementsTable({ dataSetId }) {
  const { data, loading, error, refetch } = useDataQuery(
    dataElementsByDataSetQuery,
    { variables: { id: "" }, lazy: true }
  )

  // re-run når id endrer seg (oppgavetekstens forventning)
  useEffect(() => {
    if (dataSetId) {
        refetch({ id: dataSetId }).catch(() => {})
    }
  }, [dataSetId, refetch])

  if (!dataSetId) return null
  if (loading && !data) return <CircularLoader />
  if (error) return <span>Feil: {error.message}</span>

  const elements = data?.dataSet?.dataSetElements?.map(x => x.dataElement) ?? []
  if (!elements.length) return <span>Ingen data elements.</span>

  return (
    <Table>
      <TableHead>
        <TableRowHead>
          <TableCellHead>Display name</TableCellHead>
          <TableCellHead>ID</TableCellHead>
          <TableCellHead>Created</TableCellHead>
        </TableRowHead>
      </TableHead>
      <TableBody>
        {elements.map(el => (
          <TableRow key={el.id}>
            <TableCell>{el.displayName}</TableCell>
            <TableCell>{el.id}</TableCell>
            <TableCell>{new Date(el.created).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
