import { Suspense, useState } from "react"
import { Center, CircularLoader } from "@dhis2/ui"
import Navigation from "./components/Navigation.jsx"
import Browse from "./pages/Browse.jsx"

import "./styles/App.css"
import "./styles/datasets.css"

const TABS = { 
    BROWSE: "browse" 
}

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.BROWSE)

  return (
    <div className="app">
      <Navigation activeTab={activeTab} onChangeTab={setActiveTab} TABS={TABS} />
      <Suspense fallback={<Center><CircularLoader /></Center>}>
        {activeTab === TABS.BROWSE && <Browse />}
      </Suspense>
    </div>
  )
}
