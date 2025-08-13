// src/SettingsModal.jsx
import { useMemo, useState, useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import {
  Modal, ModalTitle, ModalContent, ModalActions,
  Button, SingleSelect, SingleSelectOption, Input, Field, NoticeBox, CircularLoader,
} from '@dhis2/ui'

const listQuery = {
  dataSets: {
    resource: 'dataSets',
    params: {
      // Viktig: separate felter
      fields: ['id', 'displayName'],
      paging: false,
    },
  },
}

export default function SettingsModal({ open, onClose, value, onChange }) {
  const { data, loading, error } = useDataQuery(listQuery)
  const dataSets = useMemo(() => data?.dataSets?.dataSets ?? [], [data])

  const [draft, setDraft] = useState(value)
  useEffect(() => { if (open) setDraft(value) }, [open, value])

  function apply() {
    onChange(draft)
    onClose()
  }

  // Bruk selected bare hvis verdien finnes i options
  const datasetExists = dataSets.some(ds => ds.id === draft.datasetId)
  const selectedDataset = datasetExists ? draft.datasetId : undefined

  return (
    <Modal onClose={onClose} position="middle" large hideBackdrop={!open}>
      <ModalTitle>Settings</ModalTitle>
      <ModalContent>
        {error && <NoticeBox error title="Error">{error.message}</NoticeBox>}
        {loading && <CircularLoader />}

        <Field label="Dataset">
          <SingleSelect
            selected={selectedDataset}
            placeholder={loading ? 'Loading…' : 'Choose a dataset'}
            onChange={({ selected }) => setDraft(s => ({ ...s, datasetId: selected }))}
            dense
          >
            {dataSets.map(ds => (
              <SingleSelectOption key={ds.id} value={ds.id} label={ds.displayName} />
            ))}
          </SingleSelect>
        </Field>

        <Field label="Organisation unit (ID)">
          <Input
            value={draft.orgUnit}
            onChange={({ value }) => setDraft(s => ({ ...s, orgUnit: value }))}
            dense
          />
        </Field>

        <Field label="Period (e.g. 2020, 202209)">
          <Input
            value={draft.period}
            onChange={({ value }) => setDraft(s => ({ ...s, period: value }))}
            dense
          />
        </Field>
      </ModalContent>

      <ModalActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button primary onClick={apply}>Save</Button>
      </ModalActions>
    </Modal>
  )
}
