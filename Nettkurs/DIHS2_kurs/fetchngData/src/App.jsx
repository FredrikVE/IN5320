import { Suspense, useState } from "react"
import { Center, CircularLoader } from "@dhis2/ui"
import Navigation from "./components/Navigation.jsx"
import Browse from "./pages/Browse.jsx"

// Importerer css-filer
import "./App.module.css";

// Objekt med navigasjonselementer
const TABS = {
  BROWSE: "browse",
  INSERT: "insert",
  DATASETS: "datasets",
}


// App() fungerer som en main()
export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.BROWSE)

  return (
    // legger appen som helhet inn i en div-wrapper for å gi alt litt padding i App.css
    <div className="app">
      <Navigation
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        TABS={TABS}
      />

      {/* Suspense som setter circularloader frem til navigasjons-tab velges. */}
      <Suspense 
        fallback={<Center><CircularLoader /></Center>}>
        {activeTab === TABS.DATASETS && <Datasets />}
        {activeTab === TABS.BROWSE   && <Browse />}
        {activeTab === TABS.INSERT   && <Insert />}
      </Suspense>

    </div>
  )
}
