import { Tab, TabBar } from '@dhis2/ui'

export default function Navigation({ current, onChange }) {
    return (
        <TabBar>
            <Tab
                selected={current === 'browse'}
                onClick={() => onChange('browse')}
            >
                Browse
            </Tab>
            <Tab
                selected={current === 'insert'}
                onClick={() => onChange('insert')}
            >
                Insert
            </Tab>
            <Tab
                selected={current === 'datasets'}
                onClick={() => onChange('datasets')}
            >
                Datasets
            </Tab>
        </TabBar>
    )
}
