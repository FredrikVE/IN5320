// src/Datasets.jsx
import { useMemo, useRef, useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import {
  NoticeBox,
  CircularLoader,
  Menu,
  MenuItem,
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
} from '@dhis2/ui'

// -------- Spørringer --------

// (A) Hent ALLE datasett (id, displayName, created)
const listQuery = {
  dataSets: {
    resource: 'dataSets',
    params: {
      fields: ['id', 'displayName', 'created'],
      paging: false,
    },
  },
}

// (B) Hent data elements for ett dataset-id
//     /api/dataSets/{id}?fields=dataSetElements[dataElement[displayName,id,created]]
const dataElementsQuery = {
  dataSet: {
    resource: ({ id }) => `dataSets/${id}`,
    params: {
      fields: ['dataSetElements[dataElement[displayName,id,created]]'],
    },
  },
}

export default function Datasets() {
  const [selectedId, setSelectedId] = useState(null)
  const showElements = true // sett til false om du kun vil vise metadata-tabellen
  const cacheRef = useRef(new Map()) // enkel cache pr. dataset-id

  // Hent alle datasett til venstre-lista
  const { data, loading, error } = useDataQuery(listQuery)

  // Finn valgt dataset-objekt (for metadata-tabell)
  const selected = useMemo(() => {
    if (!data?.dataSets?.dataSets || !selectedId) return null
    return data.dataSets.dataSets.find((d) => d.id === selectedId) || null
  }, [data, selectedId])

  // Hent data elements for valgt dataset (lazy + variabler)
  const {
    data: details,
    loading: detailsLoading,
    error: detailsError,
    refetch,
  } = useDataQuery(dataElementsQuery, {
    variables: { id: selectedId || '' },
    lazy: true,
  })

  function onSelect(id) {
    setSelectedId(id)
    if (showElements && !cacheRef.current.has(id)) {
      refetch({ id })
        .then((res) => {
          cacheRef.current.set(id, res?.dataSet) // cache hele responsen
        })
        .catch(() => {})
    }
  }

  // Les detaljene fra cache først (om finnes)
  const cachedDetails = selectedId ? cacheRef.current.get(selectedId) : null
  const elementRows =
    cachedDetails?.dataSetElements ||
    details?.dataSet?.dataSetElements ||
    []

  // ---------- Render ----------
  if (error) return <NoticeBox error title="Error">{error.message}</NoticeBox>
  if (loading) return <CircularLoader />

  const rows = data?.dataSets?.dataSets || []

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        marginTop: 12,
      }}
    >
      {/* Venstre: liste */}
      <div style={{ width: 280 }}>
        <Menu>
          {rows.map((ds) => (
            <MenuItem
              key={ds.id}
              label={ds.displayName}
              active={ds.id === selectedId}
              onClick={() => onSelect(ds.id)}
            />
          ))}
        </Menu>
      </div>

      {/* Høyre: tabell(er) */}
      <div style={{ flex: 1 }}>
        {!selectedId && (
          <NoticeBox title="Select a dataset">
            Choose a dataset from the list.
          </NoticeBox>
        )}

        {selectedId && !showElements && selected && (
          <>
            <h3 style={{ margin: '0 0 8px' }}>{selected.displayName}</h3>
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
                  <TableCell>{selected.displayName}</TableCell>
                  <TableCell>{selected.id}</TableCell>
                  <TableCell>
                    {new Date(selected.created).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}

        {selectedId && showElements && (
          <>
            <h3 style={{ margin: '0 0 8px' }}>
              Data elements in dataset
              {selected ? `: ${selected.displayName}` : ''}
            </h3>

            {detailsError && (
              <NoticeBox error title="Error">
                {detailsError.message}
              </NoticeBox>
            )}

            {detailsLoading && !cachedDetails && <CircularLoader />}

            {elementRows.length > 0 && (
              <Table>
                <TableHead>
                  <TableRowHead>
                    <TableCellHead>Display Name</TableCellHead>
                    <TableCellHead>ID</TableCellHead>
                    <TableCellHead>Created</TableCellHead>
                  </TableRowHead>
                </TableHead>
                <TableBody>
                  {elementRows.map((e) => (
                    <TableRow key={e.dataElement.id}>
                      <TableCell>{e.dataElement.displayName}</TableCell>
                      <TableCell>{e.dataElement.id}</TableCell>
                      <TableCell>
                        {e.dataElement.created
                          ? new Date(e.dataElement.created).toLocaleString()
                          : '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {!detailsLoading && elementRows.length === 0 && (
              <NoticeBox>Dataset has no data elements.</NoticeBox>
            )}
          </>
        )}
      </div>
    </div>
  )
}
