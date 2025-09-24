import { Menu, MenuItem } from "@dhis2/ui"

export default function DatasetsList({ items, selectedId, onSelect }) {
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
