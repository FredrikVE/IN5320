// src/components/Navigation.jsx
import { Menu, MenuItem } from "@dhis2/ui"

export default function Navigation({ activeTab, onChangeTab, TABS }) {
  return (
    <Menu>
      <MenuItem
        label="Browse"
        active={activeTab === TABS.BROWSE}
        onClick={() => onChangeTab(TABS.BROWSE)}
      />
      <MenuItem
        label="Insert"
        active={activeTab === TABS.INSERT}
        onClick={() => onChangeTab(TABS.INSERT)}
      />
      <MenuItem
        label="Datasets"
        active={activeTab === TABS.DATASETS}
        onClick={() => onChangeTab(TABS.DATASETS)}
      />
    </Menu>
  )
}
