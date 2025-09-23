import { useDataQuery } from '@dhis2/app-runtime'
import { dataQuery } from '../data/queries'

function mergeData(data) {
    return data.dataSets.dataSetElements.map(d => {
        let matchedValue = data.dataValueSets.dataValues.find(dataValues => {
            if (dataValues.dataElement == d.dataElement.id) {
                return true
            }
        })

        return {
            displayName: d.dataElement.displayName,
            id: d.dataElement.id,
            value: matchedValue.value,
        }
    })
}

export default function Browse() {
    const { loading, error, data } = useDataQuery(dataQuery)
    if (error) {
        return <span>ERROR: {error.message}</span>
    }

    if (loading) {
        return <span>Loading...</span>
    }

    if (data) {
        let mergedData = mergeData(data)
        console.log(mergedData)
    }

    return <h1>Browse</h1>
}