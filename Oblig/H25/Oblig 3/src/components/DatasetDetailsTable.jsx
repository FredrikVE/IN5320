// src/components/DatasetDetailsTable.jsx
import {
  Table, TableHead, TableRowHead, TableCellHead,
  TableBody, TableRow, TableCell
} from "@dhis2/ui"

//import "../styles/datasets.css"

export default function DatasetDetailsTable({ dataset }) {
  if (!dataset) return null

  const { displayName, id, created } = dataset

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
          <TableCell>{displayName}</TableCell>
          <TableCell>{id}</TableCell>
          <TableCell>{new Date(created).toLocaleString()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
