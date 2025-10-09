//src/utils/mergeData.js
export function mergeData(data) {
    return data.dataSets.dataSetElements.map(d => {
        const matchedValue = data.dataValueSets.dataValues.find(dataValues => (
            dataValues.dataElement === d.dataElement.id
        ))

        return {
            displayName: d.dataElement.displayName,
            id: d.dataElement.id,
            value: matchedValue ? matchedValue.value : null,
        }
    })
}
