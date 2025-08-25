//src/datasource/dataElementsQuery.js
export const dataElementsQuery = {
    dataSet: {
        resource: "dataSets",
        id: ({ id }) => id,
        params: {
            fields: [
                "id",
                "dataSetElements[dataElement[id,displayName,created]]"
            ],
        },
    },
}
