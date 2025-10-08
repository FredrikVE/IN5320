import { TabBar, Tab } from "@dhis2/ui";

export default function Navigation({ activeTab, onChangeTab, TABS }) {
  return (
    <TabBar>
      <Tab selected={activeTab === TABS.INSPECT} onClick={() => onChangeTab(TABS.INSPECT)}>
        Inspeksjon
      </Tab>
      <Tab selected={activeTab === TABS.PLANNER} onClick={() => onChangeTab(TABS.PLANNER)}>
        Planlegger
      </Tab>
      <Tab selected={activeTab === TABS.ANALYTICS} onClick={() => onChangeTab(TABS.ANALYTICS)}>
        Analyse
      </Tab>
    </TabBar>
  );
}

