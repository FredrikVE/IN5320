//src/datasource/dataElementsQuery.js
export const dataElementsQuery = {
    dataSet: {
        resource: "dataSets",
        id: ({ id }) => id,
        params: {
            fields: [
                "dataSetElements[dataElement[id,displayName,created]]"
            ],
        },
    },
}
