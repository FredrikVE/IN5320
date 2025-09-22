// src/components/DatasetDetailsTable.jsx
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell } from "@dhis2/ui"

export default function DatasetDetailsTable({ dataset }) {
 
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
