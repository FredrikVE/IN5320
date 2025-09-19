import { Button } from '@dhis2/ui'

export default function ButtonRow({ onSelect }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Button onClick={() => onSelect('default')}>Default button</Button>

            <Button primary onClick={() => onSelect('primary')}>
                Primary button
            </Button>

            <Button secondary onClick={() => onSelect('secondary')}>
                Secondary button
            </Button>

            <Button destructive onClick={() => onSelect('destructive')}>
                Destructive button
            </Button>
        </div>
    )
}
