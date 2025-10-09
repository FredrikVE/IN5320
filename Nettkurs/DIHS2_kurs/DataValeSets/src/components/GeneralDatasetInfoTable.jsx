//src/components/GeneralDatasetInfoTable.jsx
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell } from "@dhis2/ui"

export default function GeneralDatasetInfoTable({ dataset }) {
  
  // returner tabellelement med generell informasjon om valgt datasett
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
        <TableRow>
          <TableCell>{dataset.displayName}</TableCell>
          <TableCell>{dataset.id}</TableCell>
          <TableCell>{new Date(dataset.created).toLocaleString()}</TableCell>
        </TableRow>
      </TableBody>
      
    </Table>
  )
}
