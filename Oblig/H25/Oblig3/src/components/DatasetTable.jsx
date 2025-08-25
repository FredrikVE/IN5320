// src/components/DatasetDetailsTable.jsx
import {
    Table, 
    TableHead, 
    TableRowHead, 
    TableCellHead,
    TableBody, 
    TableRow, 
    TableCell 
} from "@dhis2/ui"
import { formatDateTime } from "../utils/formatDate"

export default function DatasetDetailsTable({ dataset }) {
    if (!dataset) return null
    return (
        <>
            <h3 style={{ marginTop: 0 }}>{dataset.displayName}</h3>
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
                        <TableCell>{formatDateTime(dataset.created)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}
