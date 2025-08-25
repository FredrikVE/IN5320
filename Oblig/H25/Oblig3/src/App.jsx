// src/App.js
import { useState } from "react"
import classes from "./App.module.css"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import Datasets from "./components/Datasets"

export default function MyApp() {
    // Holder styr på hvilken fane som er valgt
    const [current, setCurrent] = useState("home")

    return (
        <div className={classes.container}>
            <Navigation current={current} setCurrent={setCurrent} />
            {current === "home" && <Home />}
            {current === "datasets" && <Datasets />}
        </div>
    )
}



