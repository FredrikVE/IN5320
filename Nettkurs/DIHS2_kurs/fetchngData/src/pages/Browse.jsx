import { useDataQuery } from '@dhis2/app-runtime'

const dataQuery = {
    dataSets: {
        resource: 'dataSets/aLpVgfXiz0f',
        params: {
            fields: [
                'name',
                'id',
                'dataSetElements[dataElement[id, displayName]',
            ],
        },
    },
    dataValueSets: {
        resource: 'dataValueSets',
        params: {
            orgUnit: 'KiheEgvUZ0i',
            dataSet: 'aLpVgfXiz0f',
            period: '2020',
        },
    },
}

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