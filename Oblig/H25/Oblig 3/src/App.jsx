// src/App.jsx
import { Suspense, useState } from "react"
import { Center, CircularLoader } from "@dhis2/ui"
import Navigation from "./components/Navigation.jsx"
import Browse from "./pages/Browse.jsx"
import Insert from "./pages/Insert.jsx"
import Datasets from "./pages/Datasets.jsx"

import "./styles/App.css"
import "./styles/datasets.css"

const TABS = {
  BROWSE: "browse",
  INSERT: "insert",
  DATASETS: "datasets",
}

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.DATASETS)

  return (
    <div className="app">
      <Navigation
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        TABS={TABS}
      />

      <Suspense 
        fallback={<Center><CircularLoader /></Center>}>
        {activeTab === TABS.DATASETS && <Datasets />}
        {activeTab === TABS.BROWSE   && <Browse />}
        {activeTab === TABS.INSERT   && <Insert />}
      </Suspense>

   
    </div>
  )
}
