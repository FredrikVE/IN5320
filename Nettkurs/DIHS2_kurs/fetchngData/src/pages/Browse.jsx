// src/pages/Browse.jsx
import { useDataQuery } from '@dhis2/app-runtime'
import { dataQuery } from '../data/queries'
import { CircularLoader } from '@dhis2/ui'
import { Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from '@dhis2/ui'
import { mergeData } from '../utils/mergeData'

export default function Browse() {
    const { loading, error, data } = useDataQuery(dataQuery)

    if (error) {
        return <span>ERROR: {error.message}</span>
    }

    if (loading) {
        return <CircularLoader large />
    }

    if (data) {
        const mergedData = mergeData(data)  // funksjon for dette ligger modularisert ut i utils-mappa
        console.log(mergedData)

        return (
            <Table>
                {/* Tabell-head med overskrifter */}
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>Display Name</TableCellHead>
                        <TableCellHead>Value</TableCellHead>
                        <TableCellHead>ID</TableCellHead>
                    </TableRowHead>
                </TableHead>

                {/* Hovedinnhold i tabellen */}
                <TableBody>
                    {mergedData.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.displayName}</TableCell>
                            <TableCell>{row.value}</TableCell>
                            <TableCell>{row.id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return null
}
