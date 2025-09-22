//src/components/Navigation.jsx
import { TabBar, Tab } from "@dhis2/ui"

export default function Navigation({ current, setCurrent }) {
    return (
        <div>
            <TabBar>
                <Tab selected={current === "datasets"} onClick={() => setCurrent("datasets")}>Datasets</Tab>
                <Tab selected={current === "browse"} onClick={() => setCurrent("browse")}>Browse</Tab>
                <Tab selected={current === "insert"} onClick={() => setCurrent("insert")}>Insert</Tab>
            </TabBar>
        </div>
    )
}
