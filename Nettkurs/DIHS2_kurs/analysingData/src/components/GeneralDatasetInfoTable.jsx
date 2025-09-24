import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell } from "@dhis2/ui"

export default function GeneralDatasetInfoTable({ dataset }) {
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
        <TableRow>
          <TableCell>{dataset.displayName}</TableCell>
          <TableCell>{dataset.id}</TableCell>
          <TableCell>{new Date(dataset.created).toLocaleString()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
