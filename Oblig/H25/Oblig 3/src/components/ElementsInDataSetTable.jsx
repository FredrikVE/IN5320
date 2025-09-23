// src/components/ElementsInDataSetTable.jsx
// Tabell for å vise elementene i datasettet jf step 7
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, NoticeBox, CircularLoader } from "@dhis2/ui"
import { useDataElementsByDataSet } from "../hooks/useDataElementsByDataSet"

export default function ElementsInDataSetTable({ dataSetId }) {
  const { isLoading, error, datasetElements } = useDataElementsByDataSet(dataSetId)

  if (isLoading) {
    return <CircularLoader />
  }

  if (error) {
    return <NoticeBox error title="Kunne ikke hente dataelementer">{error.message}</NoticeBox>
  }

  if (!datasetElements.length) {
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
        {datasetElements.map(el => (
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
