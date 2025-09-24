import { TabBar, Tab } from "@dhis2/ui"

export default function Navigation({ activeTab, onChangeTab, TABS }) {
  return (
    <TabBar>
      <Tab selected={activeTab === TABS.BROWSE} onClick={() => onChangeTab(TABS.BROWSE)}>
        Browse
      </Tab>
    </TabBar>
  )
}
