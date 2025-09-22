// src/components/DatasetsList.jsx
import { Menu, MenuItem, NoticeBox } from "@dhis2/ui"

export default function DatasetsList({ dataSets = [], selectedId, onSelect }) {
    if (!dataSets.length) {
        return <NoticeBox title="Ingen data">Fant ingen datasets.</NoticeBox>
    }
    return (
        <Menu>
            {dataSets.map((dataSet) => (
                <MenuItem
                    key={dataSet.id}
                    label={dataSet.displayName}
                    active={dataSet.id === selectedId}
                    onClick={() => onSelect?.(dataSet)}
                />
            ))}
        </Menu>
    )
}
