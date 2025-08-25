// src/components/DatasetMetadataTable.jsx
import {
  Table, TableHead, TableRowHead, TableCellHead,
  TableBody, TableRow, TableCell
} from "@dhis2/ui"

export default function DatasetMetadataTable({ dataset }) {
  if (!dataset) return null
  return (
    <Table>
      <TableHead>
        <TableRowHead>
          <TableCellHead>Display Name</TableCellHead>
          <TableCellHead>ID</TableCellHead>
          <TableCellHead>Created</TableCellHead>
        </TableRowHead>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{dataset.displayName}</TableCell>
          <TableCell>{dataset.id}</TableCell>
          <TableCell>
            {dataset.created ? new Date(dataset.created).toLocaleString() : "—"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
