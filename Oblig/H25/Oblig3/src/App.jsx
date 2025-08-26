// src/App.jsx
import { useState, Suspense } from "react"
import Navigation from "./components/Navigation.jsx"
import Browse from "./components/NavigationTabs/Browse.jsx"
import Insert from "./components/NavigationTabs/Insert.jsx"
import Datasets from "./components/NavigationTabs/Datasets.jsx"
import { CircularLoader, Center } from "@dhis2/ui"
import classes from "./styles/App.module.css"

export default function MyApp() {
  const [tab, setTab] = useState("datasets")

  return (
    <>
      {/* faner rett under blå header */}
      <Navigation current={tab} setCurrent={setTab} />

      {/* sideinnhold under faner */}
      <div className={classes.page}>
        <Suspense fallback={<Center><CircularLoader /></Center>}>
          {tab === "datasets" && <Datasets />}
          {tab === "browse"   && <Browse />}
          {tab === "insert"   && <Insert />}
        </Suspense>
      </div>
    </>
  )
}
