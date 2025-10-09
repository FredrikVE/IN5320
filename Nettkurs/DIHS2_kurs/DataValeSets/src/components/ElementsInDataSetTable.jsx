//src/components/ElementsInDataSetTable.jsx
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, NoticeBox, CircularLoader } from "@dhis2/ui"
import { useDataElementsByDataSet } from "../hooks/useDataElementsByDataSet"
import { useDataValues } from "../hooks/useDataValues"
import { mergeData } from "../utils/mergeData"


export default function ElementsInDataSetTable({ dataSetId, orgUnitId, period }) {
  const { loading: loadingElements, error: errorElements, datasetElements } = useDataElementsByDataSet(dataSetId)
  const { loading: loadingValues, error: errorValues, values } = useDataValues(dataSetId, orgUnitId, period)

  if (loadingElements || loadingValues) return <CircularLoader />

  if (errorElements || errorValues) {
    return <NoticeBox error title="Kunne ikke hente data">
      {(errorElements?.message || "") + (errorValues?.message || "")}
    </NoticeBox>
  }

  const mergedData = mergeData(datasetElements, values)

  return (
    <Table>
      <TableHead>
        <TableRowHead>
          <TableCellHead>Display name</TableCellHead>
          <TableCellHead>ID</TableCellHead>
          <TableCellHead>Created</TableCellHead>
          <TableCellHead>Value</TableCellHead>
        </TableRowHead>
      </TableHead>
      <TableBody>
        {mergedData.map(el => (
          <TableRow key={el.id}>
            <TableCell>{el.displayName}</TableCell>
            <TableCell>{el.id}</TableCell>
            <TableCell>{new Date(el.created).toLocaleString()}</TableCell>
            <TableCell>{el.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
