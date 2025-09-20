// src/components/Browse.jsx
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
    TableFoot,
} from '@dhis2/ui'

export function Browse() {
    // Hardkodede rader
    const rows = [
        { id: 'JIazHXNSnFJ', displayName: 'Injectable antibiotics', value: 42 },
        { id: 'DTtCy7Nx5jH', displayName: 'Total population < 5 years', value: 128 },
        { id: 'WUg3MYWQ7pt', displayName: 'Total Population', value: 5200 },
    ]

    return (
        <Table>
          
            <TableHead>
                <TableRowHead>
                    <TableCellHead>Display name</TableCellHead>
                    <TableCellHead>Value</TableCellHead>
                    <TableCellHead>ID</TableCellHead>
                </TableRowHead>
            </TableHead>

            <TableBody>
                {rows.map(row => (
                    <TableRow key={row.id}>
                        <TableCell>{row.displayName}</TableCell>
                        <TableCell>{row.value}</TableCell>
                        <TableCell>{row.id}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <TableFoot>
                <TableRow>
                    <TableCell colSpan="3">Hardkodet eksempel</TableCell>
                </TableRow>
            </TableFoot>
        </Table>
    )
}
