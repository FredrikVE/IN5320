// src/Datasets.jsx
import { useMemo, useRef, useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import {
  NoticeBox,
  CircularLoader,
  Menu,
  MenuItem,
  Table, TableHead, TableRowHead, TableCellHead,
  TableBody, TableRow, TableCell,
} from '@dhis2/ui'

// 1) Hent ALLE datasett (id, displayName, created) – paging av
const listQuery = {
  dataSets: {
    resource: 'dataSets',
    params: {
      fields: ['id', 'displayName', 'created'],
      paging: false,
    },
  },
}

// 2) Hent data elements for ETT valgt dataset (valgfritt steg 7)
//    NB: resource skal være en streng; bruk dynamisk `id`-felt.
const dataElementsQuery = {
  dataSet: {
    resource: 'dataSets',
    id: ({ id }) => id,
    params: {
      fields: ['dataSetElements[dataElement[displayName,id,created]]'],
    },
  },
}

export default function Datasets() {
  const [selectedId, setSelectedId] = useState(null)

  // Enkel cache for steg 6 (ikke hent om vi allerede har gjort det)
  const cacheRef = useRef(new Map())

  // Liste over datasett (venstre meny)
  const { data, loading, error } = useDataQuery(listQuery)
  const rows = data?.dataSets?.dataSets ?? []

  // Finn valgt dataset-objekt (for metadata-tabell i steg 5)
  const selected = useMemo(() => {
    if (!rows.length || !selectedId) return null
    return rows.find((d) => d.id === selectedId) || null
  }, [rows, selectedId])

  // Detaljer (data elements) for valgt dataset (steg 7)
  const {
    data: details,
    loading: detailsLoading,
    error: detailsError,
    refetch,
  } = useDataQuery(dataElementsQuery, {
    variables: { id: selectedId || '' },
    lazy: true, // ikke kjør før vi ber om det
  })

  function onSelect(id) {
    setSelectedId(id)
    if (!cacheRef.current.has(id)) {
      refetch({ id })
        .then((res) => cacheRef.current.set(id, res?.dataSet))
        .catch(() => {})
    }
  }

  const cachedDetails = selectedId ? cacheRef.current.get(selectedId) : null
  const elementRows =
    cachedDetails?.dataSetElements ||
    details?.dataSet?.dataSetElements ||
    []

  if (error) return <NoticeBox error title="Error">{error.message}</NoticeBox>
  if (loading) return <div style={{ padding: 16 }}><CircularLoader /></div>

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {/* Venstre: liste over datasett (steg 4) */}
      <aside style={{ width: 320 }}>
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
      </aside>

      {/* Høyre: tabeller (steg 5 og valgfritt 7) */}
      <section style={{ flex: 1 }}>
        {!selectedId && (
          <NoticeBox title="Select a dataset">
            Choose a dataset from the list.
          </NoticeBox>
        )}

        {/* Steg 5: Vis metadata for valgt dataset */}
        {selected && (
          <>
            <h3 style={{ marginTop: 0 }}>{selected.displayName}</h3>
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
                  <TableCell>{new Date(selected.created).toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}

        {/* (Valgfritt) Steg 7: Vis dataElements i valgt dataset */}
        {selected && (
          <>
            <h4 style={{ marginTop: 24 }}>Data elements in dataset</h4>

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
      </section>
    </div>
  )
}
