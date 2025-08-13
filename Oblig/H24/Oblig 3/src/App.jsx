//src/App.jsx
import { useState, Suspense } from 'react'
import Navigation from './Navigation.jsx'
import Browse from './Browse.jsx'
import Insert from './Insert.jsx'
import Datasets from './Datasets.jsx'

export default function App() {
    const [tab, setTab] = useState('browse')

    return (
        <>
            <Navigation current={tab} onChange={setTab} />
            <Suspense fallback={null}>
                {tab === 'browse'   && <Browse />}
                {tab === 'insert'   && <Insert />}
                {tab === 'datasets' && <Datasets />}
            </Suspense>
        </>
    )
}
