import { useDataQuery } from '@dhis2/app-runtime'
import {
  CircularLoader,
  NoticeBox,
  Table, TableHead, TableRowHead, TableCellHead,
  TableBody, TableRow, TableCell,
} from '@dhis2/ui'

// Konstanter fra guiden
const DATASET_ID = 'aLpVgfXiz0f'
const ORG_UNIT   = 'KiheEgvUZ0i'
const PERIOD     = '2020'

// To queries (metadata + verdier)
const dataQuery = {
  dataSets: {
    resource: `dataSets/${DATASET_ID}`,
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
      orgUnit: ORG_UNIT,
      dataSet: DATASET_ID,
      period: PERIOD,
    },
  },
}

// Slår sammen metadata og verdier
function mergeData(data) {
  return data.dataSets.dataSetElements.map(d => {
    const match = data.dataValueSets.dataValues?.find(v => v.dataElement === d.dataElement.id)
    return {
      displayName: d.dataElement.displayName,
      id: d.dataElement.id,
      value: match ? match.value : '—',
    }
  })
}

export default function Browse() {
  const { loading, error, data } = useDataQuery(dataQuery)

  if (error) return <NoticeBox error title="Error">{error.message}</NoticeBox>
  if (loading) return <div style={{ padding: 16 }}><CircularLoader /></div>

  const rows = mergeData(data)

  return (
    <div style={{ padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Browse – {data.dataSets.name}</h3>
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
