// src/components/Table/DataElements.jsx
import {
  Table, TableHead, TableRowHead, TableCellHead,
  TableBody, TableRow, TableCell
} from "@dhis2/ui"

import { formatDateTime } from "../../utils/formatDate"

export default function DatasetSummaryTable({ elements = [] }) {
  if (elements.length) {
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
          {elements.map(element => (
            <TableRow key={element.dataElement.id}>
              <TableCell>{element.dataElement.displayName}</TableCell>
              <TableCell>{element.dataElement.id}</TableCell>
              <TableCell>
                {formatDateTime(element.dataElement.created)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    )
  }
}
