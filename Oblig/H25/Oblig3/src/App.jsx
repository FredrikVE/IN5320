import React, { useState, Suspense } from "react"
import classes from "./styles/App.module.css"
import Navigation from "./components/Navigation.jsx"
import Browse from "./components/Browse.jsx"
import Insert from "./components/Insert.jsx"
import Datasets from "./components/Datasets.jsx"
import { CircularLoader, Center } from "@dhis2/ui"

export default function MyApp() {
    const [current, setCurrent] = useState("browse") // start i Browse

    return (
        <div className={classes.container}>
            <Navigation current={current} setCurrent={setCurrent} />
            <Suspense fallback={<Center><CircularLoader /></Center>}>
                {current === "browse"   && <Browse />}
                {current === "insert"   && <Insert />}
                {current === "datasets" && <Datasets />}
            </Suspense>
        </div>
    )
}
