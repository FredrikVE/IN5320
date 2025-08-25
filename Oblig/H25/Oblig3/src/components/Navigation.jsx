//src/components/Navigation.js
import { TabBar, Tab } from "@dhis2/ui"

export default function Navigation({ current, setCurrent }) {
    return (
        <TabBar>
            <Tab selected={current === "home"} onClick={() => setCurrent("home")}>
                Hjem
            </Tab>
            <Tab selected={current === "datasets"} onClick={() => setCurrent("datasets")}>
                Datasets
            </Tab>
        </TabBar>
    )
}
