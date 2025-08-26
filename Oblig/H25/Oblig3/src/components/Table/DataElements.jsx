// src/components/Table/DataElements.jsx
import {
  Table, TableHead, TableRowHead, TableCellHead,
  TableBody, TableRow, TableCell
} from "@dhis2/ui"

import { formatDateTime } from "../../utils/formatDate"

export default function DataElementsTable({ elements = [] }) {
  if (!elements.length) return null
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
        {elements.map(e => (
          <TableRow key={e.dataElement.id}>
            <TableCell>{e.dataElement.displayName}</TableCell>
            <TableCell>{e.dataElement.id}</TableCell>
            <TableCell>
              {formatDateTime(e.dataElement.created)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
