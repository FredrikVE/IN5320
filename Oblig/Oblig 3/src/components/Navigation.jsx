//src/components/Navigation.jsx
//navigasjon til navigerings-tab for steg 2
import { TabBar, Tab } from "@dhis2/ui"

export default function Navigation({ activeTab, onChangeTab, TABS }) {
  return (
    <TabBar>

      {/*Tab for datasets */}
      <Tab
        selected={activeTab === TABS.DATASETS}
        onClick={() => onChangeTab(TABS.DATASETS)}
      >
        Datasets
      </Tab>

      {/*Tab for browse */}
      <Tab
        selected={activeTab === TABS.BROWSE}
        onClick={() => onChangeTab(TABS.BROWSE)}
      >
        Browse
      </Tab>

      {/*Tab for insert */}
      <Tab
        selected={activeTab === TABS.INSERT}
        onClick={() => onChangeTab(TABS.INSERT)}
      >
        Insert
      </Tab>
      
    </TabBar>
  )
}
