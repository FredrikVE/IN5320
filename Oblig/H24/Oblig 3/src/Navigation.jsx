// src/Navigation.jsx
import { useState } from 'react'
import { Tab, TabBar, Button } from '@dhis2/ui'
import { useSettings } from './Settings'
import SettingsModal from './SettingsModal'

// Prøv å importere ikonet hvis pakken finnes
let IconCog16
try {
    // Krever at du har kjørt: npm install @dhis2/ui-icons
    IconCog16 = require('@dhis2/ui-icons').IconCog16
} catch (e) {
    IconCog16 = null
}

export default function Navigation({ current, onChange }) {
    const [settings, setSettings] = useSettings()
    const [open, setOpen] = useState(false)

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TabBar>
                    <Tab selected={current === 'browse'} onClick={() => onChange('browse')}>Browse</Tab>
                    <Tab selected={current === 'insert'} onClick={() => onChange('insert')}>Insert</Tab>
                    <Tab selected={current === 'datasets'} onClick={() => onChange('datasets')}>Datasets</Tab>
                </TabBar>

                <div style={{ marginLeft: 'auto' }}>
                    <Button
                        small
                        secondary
                        icon={IconCog16 ? <IconCog16 /> : undefined}
                        onClick={() => setOpen(true)}
                    >
                        Settings
                    </Button>
                </div>
            </div>

            {open && (
                <SettingsModal
                    open={open}
                    value={settings}
                    onChange={setSettings}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    )
}
