// src/Insert.jsx
import {
  ReactFinalForm,
  InputFieldFF,
  SingleSelectFieldFF,
  Button,
  hasValue,
  number,
  composeValidators,
  NoticeBox,
} from '@dhis2/ui'
import { useDataMutation } from '@dhis2/app-runtime'
import { useSettings } from './Settings'

// Mutasjon: dataSet/period/orgUnit på toppnivå i payload
const dataMutationQuery = {
  resource: 'dataValueSets',
  type: 'create',
  data: ({ dataSet, period, orgUnit, dataElement, value }) => ({
    dataSet,
    period,
    orgUnit,
    dataValues: [{ dataElement, value }],
  }),
}

export default function Insert() {
  const [{ datasetId, orgUnit, period }] = useSettings()
  const [mutate, { loading, error, data }] = useDataMutation(dataMutationQuery)

  async function onSubmit(formInput) {
    await mutate({
      dataSet: datasetId,
      period,
      orgUnit,
      dataElement: formInput.dataElement,
      value: formInput.value,
    })
  }

  return (
    <div style={{ padding: 16 }}>
      {error && <NoticeBox error title="Error">{error.message}</NoticeBox>}
      {data && <NoticeBox title="Saved">Value saved successfully.</NoticeBox>}

      {/* Begrens bredden på skjemaet */}
      <div style={{ maxWidth: 520, width: '100%' }}>
        <ReactFinalForm.Form onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'grid', gap: 12 }}>
              <ReactFinalForm.Field
                component={SingleSelectFieldFF}
                name="dataElement"
                label="Select field"
                initialValue="WUg3MYWQ7pt"
                dense
                options={[
                  { label: 'Total Population', value: 'WUg3MYWQ7pt' },
                  { label: 'Population of women of child bearing age (WRA)', value: 'vg6pdjObxsm' },
                  { label: 'Total population < 5 years', value: 'DTtCy7Nx5jH' },
                  { label: 'Expected pregnancies', value: 'h0xKKjijTdI' },
                  { label: 'Total population < 1 year', value: 'DTVRnCGamkV' },
                ]}
              />

              <ReactFinalForm.Field
                name="value"
                label="Value"
                component={InputFieldFF}
                validate={composeValidators(hasValue, number)}
                dense
              />

              <div>
                <Button type="submit" primary disabled={loading}>
                  {loading ? 'Saving…' : 'Submit'}
                </Button>
              </div>
            </form>
          )}
        </ReactFinalForm.Form>
      </div>
    </div>
  )
}
