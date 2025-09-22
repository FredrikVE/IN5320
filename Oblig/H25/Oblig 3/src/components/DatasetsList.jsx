// src/components/DatasetsList.jsx
import { Menu, MenuItem, NoticeBox } from "@dhis2/ui"

export default function DatasetsList({ items = [], selectedId, onSelect }) {
  if (!items.length) {
    return <NoticeBox title="Ingen data">Fant ingen datasets.</NoticeBox>
  }

  return (
    <Menu>
      {items.map(ds => (
        <MenuItem
          key={ds.id}
          label={ds.displayName}
          active={ds.id === selectedId}
          onClick={() => onSelect?.(ds)}
        />
      ))}
    </Menu>
  )
}
