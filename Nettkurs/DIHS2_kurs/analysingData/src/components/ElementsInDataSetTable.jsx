//Denne er sykt vibe codet dritt men ok..
//src/components/ElementsInDataSetTable.jsx
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, NoticeBox, CircularLoader } from "@dhis2/ui"
import { useDataQuery } from "@dhis2/app-runtime"
import { useDataElementsByDataSet } from "../hooks/useDataElementsByDataSet"
import { dataValuesQuery } from "../data/dataValuesQuery"

export default function ElementsInDataSetTable({ dataSetId }) {
  const { loading, error, datasetElements } = useDataElementsByDataSet(dataSetId)

  //burde denne være inni en hook??
  const {
    data: dataValues,
    loading: dvsLoading,
    error: dvsError,
  } = useDataQuery(dataValuesQuery, {variables: { dataSetId },
  })

  if (loading || dvsLoading) return <CircularLoader />
  if (error || dvsError) {
    return (
      <NoticeBox error title="Kunne ikke hente data">
        {error?.message || dvsError?.message}
      </NoticeBox>
    )
  }

  if (!datasetElements.length) {
    return <NoticeBox title="Ingen dataelementer">Dette datasettet har ingen elementer.</NoticeBox>
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
          <TableCellHead>Verdi ()</TableCellHead>
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
