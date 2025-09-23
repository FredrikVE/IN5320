// src/App.jsx
import { useState, Suspense } from "react"
import Navigation from "./components/Navigation.jsx"
import Browse from "./components/NavigationTabs/Browse.jsx"
import Insert from "./components/NavigationTabs/Insert.jsx"
import Datasets from "./components/NavigationTabs/Datasets.jsx"
import { CircularLoader, Center } from "@dhis2/ui"

import "./styles/App.module.css"
import "./styles/navigation.module.css"
import "./styles/datasets.module.css"
import "./styles/dataTable.module.css"

export default function MyApp() {
  const [tab, setTab] = useState("datasets")

  return (
    <div className="container">
      <Navigation current={tab} setCurrent={setTab} />
      <div className="page">
        <Suspense fallback={<Center><CircularLoader /></Center>}>
          {tab === "datasets" && <Datasets />}
          {tab === "browse"   && <Browse />}
          {tab === "insert"   && <Insert />}
        </Suspense>
      </div>
    </div>
  )
}
