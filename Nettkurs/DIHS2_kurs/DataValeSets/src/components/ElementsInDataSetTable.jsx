// Tabell for å vise elementene i datasettet jf step 7
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, NoticeBox, CircularLoader } from "@dhis2/ui"
import { useDataElementsByDataSet } from "../hooks/useDataElementsByDataSet"

export default function ElementsInDataSetTable({ dataSetId }) {
  const { loading, error, datasetElements } = useDataElementsByDataSet(dataSetId)

  if (loading) {
    return <CircularLoader />
  }

  if (error) {
    return <NoticeBox error title="Kunne ikke hente dataelementer">{error.message}</NoticeBox>
  }

  if (!datasetElements.length) {
    return <NoticeBox title="Ingen dataelementer">Dette datasettet har ingen elementer....</NoticeBox>
  }

  // returner et tabell-element per data-element i datasettet
  return (
    <Table>

      {/* Tabell overskrifter */}
      <TableHead>
        <TableRowHead>
          <TableCellHead>Display name</TableCellHead>
          <TableCellHead>ID</TableCellHead>
          <TableCellHead>Created</TableCellHead>
        </TableRowHead>
      </TableHead>

      {/* Tabellinnhold per rad */}
      <TableBody>
        {datasetElements.map(element => (
          <TableRow key={element.id}>
            <TableCell>{element.displayName}</TableCell>
            <TableCell>{element.id}</TableCell>
            <TableCell>{new Date(element.created).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  )
}
