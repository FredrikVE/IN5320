// src/App.jsx
import React, { useState, Suspense } from "react"
import classes from "./App.module.css"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import Datasets from "./components/Datasets"
import { CircularLoader, Center } from "@dhis2/ui"

export default function MyApp() {
    const [current, setCurrent] = useState("home")

    return (
        <div className={classes.container}>
            <Navigation current={current} setCurrent={setCurrent} />
            <Suspense fallback={
                <Center>
                    <CircularLoader />
                </Center>
            }>
                {current === "home" && <Home />}
                {current === "datasets" && <Datasets />}
            </Suspense>
        </div>
    )
}
