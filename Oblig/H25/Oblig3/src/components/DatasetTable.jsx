// src/components/DatasetTable.jsx
import { NoticeBox, CircularLoader,
    Table, TableHead, TableRowHead, TableCellHead,
    TableBody, TableRow, TableCell } from "@dhis2/ui"
import { useDataElements } from "../hooks/useDataElements"

export default function DatasetTable({ dataset }) {
    if (!dataset) return null

    const { loading, error, elements } = useDataElements(dataset.id)

    return (
        <div>
            {/* Tittel for valgt dataset */}
            <h3 style={{ margin: "0 0 12px" }}>{dataset.displayName}</h3>

            {/* Feil / lasting */}
            {error && <NoticeBox error title="Error">{error.message}</NoticeBox>}
            {loading && <CircularLoader />}

            {/* Selve data-elementene (Step 7) */}
            {!loading && elements.length === 0 && (
                <NoticeBox>Dataset has no data elements.</NoticeBox>
            )}

            {elements.length > 0 && (
                <Table>
                    <TableHead>
                        <TableRowHead>
                            <TableCellHead>Display Name</TableCellHead>
                            <TableCellHead>ID</TableCellHead>
                            <TableCellHead>Created</TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody>
                        {elements.map((e) => (
                            <TableRow key={e.dataElement.id}>
                                <TableCell>{e.dataElement.displayName}</TableCell>
                                <TableCell>{e.dataElement.id}</TableCell>
                                <TableCell>
                                    {e.dataElement.created
                                        ? new Date(e.dataElement.created).toLocaleString()
                                        : "—"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
