// src/components/DatasetsList.jsx
import { Menu, MenuItem, NoticeBox } from "@dhis2/ui"

export default function DatasetsList({ dataSets = [], selectedId, onSelect }) {
    if (!dataSets.length) {
        return <NoticeBox title="Ingen data">Fant ingen datasets.</NoticeBox>
    }
    return (
        <Menu>
            {dataSets.map((ds) => (
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
