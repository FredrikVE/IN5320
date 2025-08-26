//src/utils/sortElements.js
export function sortElements(data) {
    const rows = data?.dataSet?.dataSetElements ?? []
    return rows.slice().sort(function (a, b) {
        const nameA = a.dataElement.displayName || ""
        const nameB = b.dataElement.displayName || ""
        return nameA.localeCompare(nameB)
    })
}
