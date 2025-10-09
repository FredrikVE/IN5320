//src/pages/Insert.jsx
import { ReactFinalForm, InputFieldFF, Button, SingleSelectFieldFF, hasValue, number, composeValidators } from '@dhis2/ui'

export default function Insert(props) {
    function onSubmit(formInput) {
        console.log(formInput)
    }

    return (
        <div>
            <ReactFinalForm.Form onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <ReactFinalForm.Field
                            component={SingleSelectFieldFF}
                            name="dataElement"
                            label="Select field"
                            initialValue="WUg3MYWQ7pt"
                            options={[
                                {
                                    label: 'Total Population',
                                    value: 'WUg3MYWQ7pt',
                                },
                                {
                                    label: 'Population of women of child bearing age (WRA)',
                                    value: 'vg6pdjObxsm',
                                },
                                {
                                    label: 'Total population < 5 years  ',
                                    value: 'DTtCy7Nx5jH',
                                },
                                {
                                    label: 'Expected pregnancies',
                                    value: 'h0xKKjijTdI',
                                },
                                {
                                    label: 'Total population < 1 year   ',
                                    value: 'DTVRnCGamkV',
                                },
                            ]}
                        />
                        <ReactFinalForm.Field
                            name="value"
                            label="Value"
                            component={InputFieldFF}
                            validate={composeValidators(hasValue, number)}
                        />
                        <Button type="submit" primary>
                            Submit
                        </Button>
                    </form>
                )}
            </ReactFinalForm.Form>
        </div>
    )
}