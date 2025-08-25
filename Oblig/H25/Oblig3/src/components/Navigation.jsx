// src/components/Navigation.jsx
import { TabBar, Tab } from "@dhis2/ui"
import styles from "../styles/navigation.module.css"

export default function Navigation({ current, setCurrent }) {
    return (
        <div className={styles.stickyTabs}>
            <TabBar>
                <Tab selected={current === "browse"} onClick={() => setCurrent("browse")}>Browse</Tab>
                <Tab selected={current === "insert"} onClick={() => setCurrent("insert")}>Insert</Tab>
                <Tab selected={current === "datasets"} onClick={() => setCurrent("datasets")}>Datasets</Tab>
            </TabBar>
        </div>
    )
}
