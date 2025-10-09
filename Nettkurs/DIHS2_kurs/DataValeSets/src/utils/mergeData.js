//src/utils/mergeData.js
export function mergeData(datasetElements, dataValues) {
    return datasetElements.map(el => {
        const matchedValue = dataValues.find(v => v.dataElement === el.id)
        return {
            id: el.id,
            displayName: el.displayName,
            created: el.created,
            value: matchedValue ? matchedValue.value : "—",
        }
    })
}
