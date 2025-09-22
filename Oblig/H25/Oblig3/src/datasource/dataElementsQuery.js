//src/datasource/dataElementsQuery.js
export const metaDataElementsQuery = {
    dataSet: {
        resource: "dataSets",
        id: ({ id }) => id,
        params: {
            paging: true,
            fields: [
                //"id",
                //'displayName',
                //'created',
                "dataSetElements[dataElement[id,displayName,created]]"
            ],
        },
    },
}
