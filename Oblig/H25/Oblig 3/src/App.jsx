// src/App.jsx
import { useState } from "react"
import Navigation from "./components/Navigation.jsx"
import Browse from "./pages/Browse.jsx"
import Insert from "./pages/Insert.jsx"
import Datasets from "./pages/Datasets.jsx"

import "./styles/App.module.css"
import "./styles/datasets.css"

const TABS = {
  BROWSE: "browse",
  INSERT: "insert",
  DATASETS: "datasets",
}

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.BROWSE)

  return (
    <div className="app">
      <aside className="sidebar">
        <Navigation
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          TABS={TABS}
        />
      </aside>

      <main className="content">
        {activeTab === TABS.BROWSE   && <Browse />}
        {activeTab === TABS.INSERT   && <Insert />}
        {activeTab === TABS.DATASETS && <Datasets />}
      </main>
    </div>
  )
}
