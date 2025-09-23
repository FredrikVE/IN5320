// src/components/ElementsInDataSetTable.jsx

// utvidelse for steg 7
import { useEffect } from "react"
import { useDataQuery } from "@dhis2/app-runtime"
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, NoticeBox, CircularLoader } from "@dhis2/ui"
import { dataElementsByDataSetQuery } from "../data/dataElementsByDataSetQuery"

export default function ElementsInDataSetTable({ dataSetId }) {

  //Utfører spørring til API for å hente dataelementer.
  const queryOptions = { variables: { id: dataSetId}, lazy: true }
  const { data, loading, error, refetch } = useDataQuery(dataElementsByDataSetQuery, queryOptions)

  // UseEffect-hook for refetche når id endrer seg slik oppgaven ber om
  useEffect(() => {
    if (dataSetId) {
        refetch({ id: dataSetId})
    }
  }, [dataSetId, refetch])

  if (loading && !data) {
    return <CircularLoader />
  }

  if (error) {
    return <NoticeBox error title="Kunne ikke hente dataelementer">{error.message}</NoticeBox>
  }

  const elements = (data?.dataSet?.dataSetElements || []).map(dataset => dataset.dataElement)


  if (!elements.length) { 
    return <NoticeBox title="Ingen dataelementer">Dette datasettet har ingen elementer.</NoticeBox>
  }

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
