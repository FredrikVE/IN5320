// src/components/Navigation.jsx
import { TabBar, Tab } from "@dhis2/ui"

export default function Navigation({ activeTab, onChangeTab, TABS }) {
  return (
    <TabBar>
      <Tab
        selected={activeTab === TABS.DATASETS}
        onClick={() => onChangeTab(TABS.DATASETS)}
      >
        Datasets
      </Tab>
      <Tab
        selected={activeTab === TABS.BROWSE}
        onClick={() => onChangeTab(TABS.BROWSE)}
      >
        Browse
      </Tab>
      <Tab
        selected={activeTab === TABS.INSERT}
        onClick={() => onChangeTab(TABS.INSERT)}
      >
        Insert
      </Tab>
    </TabBar>
  )
}
