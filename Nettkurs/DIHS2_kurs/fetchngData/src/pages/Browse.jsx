import { useDataQuery } from '@dhis2/app-runtime'
import { dataQuery } from '../data/queries'
import { CircularLoader } from '@dhis2/ui'

import { Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from '@dhis2/ui'

function mergeData(data) {
    return data.dataSets.dataSetElements.map(d => {
        let matchedValue = data.dataValueSets.dataValues.find(dataValues => {
            if (dataValues.dataElement == d.dataElement.id) {
                return true
            }
        })

        return {
            displayName: d.dataElement.displayName,
            id: d.dataElement.id,
            value: matchedValue.value,
        }
    })
}

export default function Browse() {
    const { loading, error, data } = useDataQuery(dataQuery)
    console.log(mergeData)
    if (error) {
        return <span>ERROR: {error.message}</span>
    }

    if (loading) {
        return <CircularLoader large />
    }

    if (data) {
        let mergedData = mergeData(data)
        console.log(mergedData)

        return (
            <Table>
                
                {/* Tabele head med overskrifter */}
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>Display Name</TableCellHead>
                        <TableCellHead>Value</TableCellHead>
                        <TableCellHead>ID</TableCellHead>
                    </TableRowHead>
                </TableHead>

                {/* hovedinnhold i tabellen */}
                <TableBody>
                    {mergedData.map(row => {
                        return (

                            // Hver rad i TableBody
                            <TableRow key={row.id}>
                                <TableCell>{row.displayName}</TableCell>
                                <TableCell>{row.value}</TableCell>
                                <TableCell>{row.id}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>

            </Table>
        );
    }
}