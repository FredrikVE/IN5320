// src/Browse.jsx
import { useDataQuery } from '@dhis2/app-runtime'
import {
    CircularLoader,
    NoticeBox,
    Table, TableHead, TableRowHead, TableCellHead,
    TableBody, TableRow, TableCell,
} from '@dhis2/ui'
import { useSettings } from './Settings'

// Slår sammen metadata og verdier
function mergeData(data) {
    const elements = data?.dataSets?.dataSetElements ?? []
    const values = data?.dataValueSets?.dataValues ?? []

    return elements.map(d => {
        const match = values.find(v => v.dataElement === d.dataElement.id)
        return {
            displayName: d.dataElement.displayName,
            id: d.dataElement.id,
            value: match?.value ?? '—',
        }
    })
}

export default function Browse() {
    const [settings] = useSettings()
    const { datasetId, orgUnit, period } = settings

    const dataQuery = {
        dataSets: {
            resource: `dataSets/${datasetId}`,
            params: {
                fields: [
                    'name',
                    'id',
                    'dataSetElements[dataElement[id,displayName]]',
                ],
            },
        },
        dataValueSets: {
            resource: 'dataValueSets',
            params: {
                orgUnit,
                dataSet: datasetId,
                period,
            },
        },
    }

    const { loading, error, data } = useDataQuery(dataQuery)

    if (error) {
        return <NoticeBox error title="Error">{error.message}</NoticeBox>
    }
    if (loading) {
        return (
            <div style={{ padding: 16 }}>
                <CircularLoader />
            </div>
        )
    }

    const rows = mergeData(data)
    const title = data?.dataSets?.name ?? 'Dataset'

    return (
        <div style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>Browse – {title}</h3>
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>Display Name</TableCellHead>
                        <TableCellHead>Value</TableCellHead>
                        <TableCellHead>ID</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {rows.map(r => (
                        <TableRow key={r.id}>
                            <TableCell>{r.displayName}</TableCell>
                            <TableCell>{r.value}</TableCell>
                            <TableCell>{r.id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
