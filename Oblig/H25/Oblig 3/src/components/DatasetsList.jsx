// src/components/DatasetsList.jsx
import { Menu, MenuItem } from "@dhis2/ui"

export default function DatasetsList({ items, selectedId, onSelect }) {

  // Return en meny med meny-elementer for hvert datasett.
  return (
    <Menu>
      {items.map(dataset => (
        <MenuItem
          key={dataset.id}
          label={dataset.displayName}
          active={dataset.id === selectedId}
          onClick={() => onSelect?.(dataset)}
        />
      ))}
    </Menu>
  );
}
