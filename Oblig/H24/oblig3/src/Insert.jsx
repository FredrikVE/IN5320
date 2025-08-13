import {
  ReactFinalForm,
  SingleSelectFieldFF,
  InputFieldFF,
  Button,
  composeValidators,
  hasValue,
  number,
  NoticeBox,
  CircularLoader,
} from '@dhis2/ui'
import { useDataMutation } from '@dhis2/app-runtime'

const DATASET_ID = 'aLpVgfXiz0f'
const ORG_UNIT   = 'KiheEgvUZ0i'
const PERIOD     = '2020'

// Mutasjon – parametere sendes ved submit
const dataMutationQuery = {
  resource: 'dataValueSets',
  type: 'create',
  dataSet: DATASET_ID,
  data: ({ value, dataElement, period, orgUnit }) => ({
    dataValues: [
      {
        dataElement,
        period,
        orgUnit,
        value,
      },
    ],
  }),
}

export default function Insert() {
  const [mutate, { loading, error }] = useDataMutation(dataMutationQuery)

  async function onSubmit(formInput) {
    await mutate({
      value: Number(formInput.value),
      dataElement: formInput.dataElement,
      period: PERIOD,
      orgUnit: ORG_UNIT,
    })
  }

  return (
    <div style={{ padding: 16, maxWidth: 560 }}>
      <h3 style={{ marginTop: 0 }}>Insert</h3>

      {error && <NoticeBox error title="Error">{error.message}</NoticeBox>}
      {loading && <CircularLoader />}

      <ReactFinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <ReactFinalForm.Field
              name="dataElement"
              label="Select data element"
              component={SingleSelectFieldFF}
              initialValue="WUg3MYWQ7pt"
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
            />

            <div style={{ marginTop: 12 }}>
              <Button type="submit" primary>Submit</Button>
            </div>
          </form>
        )}
      </ReactFinalForm.Form>
    </div>
  )
}
